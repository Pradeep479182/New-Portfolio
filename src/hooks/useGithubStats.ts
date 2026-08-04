import axios from 'axios'
import { useEffect, useState } from 'react'

export interface ContributionDay {
  date: string
  count: number
  level: number
  color: string
}

export interface GitHubStatsSummary {
  login: string
  name: string | null
  avatarUrl: string | null
  profileUrl: string
  bio: string | null
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalContributions: number
  currentStreak: number
  longestStreak: number
  totalCommits?: number
  totalPullRequests?: number
  totalIssues?: number
  contributionDays: ContributionDay[]
  contributionCalendar: ContributionDay[][]
  monthlyTrend: { label: string; count: number }[]
  languageUsage: { language: string; count: number; percent: number; color: string }[]
  achievements: string[]
}

const languagePalette: Record<string, string> = {
  JavaScript: '#facc15',
  TypeScript: '#0ea5e9',
  Python: '#8b5cf6',
  React: '#38bdf8',
  HTML: '#ef4444',
  CSS: '#2563eb',
  Shell: '#a78bfa',
  Rust: '#f97316',
  Go: '#22c55e',
  Java: '#f43f5e',
  Vue: '#10b981',
  default: '#818cf8',
}

function getLanguageColor(language: string) {
  return languagePalette[language] ?? languagePalette.default
}

function parseContributionHtml(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const rects = Array.from(doc.querySelectorAll('rect.ContributionCalendar-day'))

  const days: ContributionDay[] = rects
    .map((rect) => {
      const date = rect.getAttribute('data-date') || ''
      const count = Number(rect.getAttribute('data-count') || '0')
      const level = Number(rect.getAttribute('data-level') || '0')
      const color = rect.getAttribute('fill') || '#0f172a'
      return { date, count, level, color }
    })
    .filter((day) => Boolean(day.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return days
}

function buildCalendar(days: ContributionDay[]) {
  const calendar: ContributionDay[][] = []
  let week: ContributionDay[] = []

  days.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      calendar.push(week)
      week = []
    }
  })

  if (week.length) {
    calendar.push(week)
  }

  return calendar
}

function computeStreaks(days: ContributionDay[]) {
  let longest = 0
  let current = 0
  let running = 0

  for (const day of days) {
    if (day.count > 0) {
      running += 1
      current += 1
    } else {
      longest = Math.max(longest, running)
      running = 0
      current = 0
    }
  }

  longest = Math.max(longest, running)
  return { currentStreak: current, longestStreak: longest }
}

function buildMonthlyTrend(days: ContributionDay[]) {
  const map = new Map<string, number>()
  days.forEach((day) => {
    const label = day.date.slice(0, 7)
    map.set(label, (map.get(label) ?? 0) + day.count)
  })
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, count]) => ({ label: label.slice(5), count }))
}

function buildLanguageUsage(repos: any[]) {
  const countMap = new Map<string, number>()
  let total = 0

  repos.forEach((repo) => {
    const lang = repo.language || 'Unknown'
    if (!countMap.has(lang)) {
      countMap.set(lang, 0)
    }
    countMap.set(lang, countMap.get(lang)! + 1)
    total += 1
  })

  return Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => ({
      language,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
      color: getLanguageColor(language),
    }))
}

function buildAchievements(profile: any, totalStars: number, totalContributions: number) {
  const badges: string[] = []
  if (profile.public_repos >= 8) badges.push('Repository Creator')
  if (profile.followers >= 25) badges.push('Community Builder')
  if (totalStars >= 30) badges.push('Star Collector')
  if (totalContributions >= 180) badges.push('Active Contributor')
  if (profile.public_repos >= 16) badges.push('Open Source Curator')
  return badges.slice(0, 4)
}

export function useGithubStats(username: string) {
  const [stats, setStats] = useState<GitHubStatsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let controller: AbortController | null = null

    async function fetchStats() {
      controller?.abort()
      controller = new AbortController()
      setLoading(true)
      setError(null)

      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN
        const headers: Record<string, string> = {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        }
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        const [profileResponse, contributionsHtml, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`, {
            headers,
            signal: controller.signal,
          }),
          axios.get(`https://github.com/users/${username}/contributions`, {
            headers: {
              'Content-Type': 'text/html',
            },
            signal: controller.signal,
          }),
          axios.get(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, {
            headers,
            signal: controller.signal,
          }),
        ])

        const profile = profileResponse.data
        const repoList = reposResponse.data || []
        const days = parseContributionHtml(contributionsHtml.data)
        const contributionCalendar = buildCalendar(days)
        const totalContributions = days.reduce((sum, day) => sum + day.count, 0)
        const { currentStreak, longestStreak } = computeStreaks(days)
        const monthlyTrend = buildMonthlyTrend(days)
        const languageUsage = buildLanguageUsage(repoList)
        const totalStars = repoList.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

        let totalCommits: number | undefined
        let totalPullRequests: number | undefined
        let totalIssues: number | undefined

        if (token) {
          try {
            const graphQLEndpoint = 'https://api.github.com/graphql'
            const query = `query Contributions($login: String!) { user(login: $login) { contributionsCollection { totalCommitContributions totalPullRequestContributions totalIssueContributions } } }`
            const graphResponse = await axios.post(
              graphQLEndpoint,
              { query, variables: { login: username } },
              { headers, signal: controller.signal },
            )

            const graphData = graphResponse.data
            const collection = graphData?.data?.user?.contributionsCollection
            totalCommits = collection?.totalCommitContributions
            totalPullRequests = collection?.totalPullRequestContributions
            totalIssues = collection?.totalIssueContributions
          } catch {
            // ignore GraphQL failures and continue with REST-derived stats
          }
        }

        if (!cancelled) {
          setStats({
            login: profile.login,
            name: profile.name || null,
            avatarUrl: profile.avatar_url || null,
            profileUrl: profile.html_url,
            bio: profile.bio || null,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            totalStars,
            totalContributions,
            currentStreak,
            longestStreak,
            totalCommits,
            totalPullRequests,
            totalIssues,
            contributionDays: days,
            contributionCalendar,
            monthlyTrend,
            languageUsage,
            achievements: buildAchievements(profile, totalStars, totalContributions),
          })
        }
      } catch (err) {
        if (axios.isCancel(err) || cancelled) return
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unable to load GitHub stats.'
          setError(message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    return () => {
      cancelled = true
      controller?.abort()
    }
  }, [username])

  return { stats, loading, error }
}
