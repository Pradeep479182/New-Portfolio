import { useEffect, useState } from 'react'
import axios from 'axios'

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics?: string[]
  language?: string | null
  previewImage?: string
  technologies?: string[]
  updated_at?: string
  stargazers_count?: number
  fork?: boolean
  archived?: boolean
}

export function useGithubRepos(username: string, perPage = 12, refreshMs = 0) {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    let controller: AbortController | null = null

    async function fetchRepos() {
      controller?.abort()
      controller = new AbortController()
      setLoading(true)
      setError(null)

      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN
        const headers: Record<string, string> = {
          Accept: 'application/vnd.github+json, application/vnd.github.mercy-preview+json',
          'X-GitHub-Api-Version': '2022-11-28',
        }

        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        const response = await axios.get<Repo[]>(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=updated&type=owner`,
          {
            headers,
            signal: controller.signal,
          },
        )

        const list = response.data
          .filter((repo) => !repo.archived)
          .sort((a, b) => new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime())

        // Enrich each repo: fetch topics and language breakdown for better tech list, add preview image
        const enriched = await Promise.all(
          list.map(async (r) => {
            try {
              const [detailRes, langRes] = await Promise.all([
                axios.get(`https://api.github.com/repos/${username}/${r.name}`, { headers, signal: controller!.signal }),
                axios.get(`https://api.github.com/repos/${username}/${r.name}/languages`, { headers, signal: controller!.signal }),
              ])

              const detail = detailRes.data
              const languages = langRes.data || {}
              const techs = Array.from(new Set([...(detail.topics || []), ...(Object.keys(languages) || []), detail.language].filter(Boolean)))
              const previewImage = `https://opengraph.githubassets.com/1/${username}/${r.name}`

              return {
                ...r,
                description: detail.description,
                topics: detail.topics || [],
                language: detail.language || r.language || null,
                previewImage,
                technologies: techs,
                homepage: detail.homepage || r.homepage,
              }
            } catch (subErr) {
              // fallback to basic repo info
              return {
                ...r,
                previewImage: `https://opengraph.githubassets.com/1/${username}/${r.name}`,
                technologies: [r.language].filter(Boolean),
              }
            }
          }),
        )

        if (!cancelled) {
          setRepos(enriched as Repo[])
        }
      } catch (err) {
        if (axios.isCancel(err) || cancelled) return

        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to fetch GitHub repositories'
          setError(message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchRepos()
    const intervalId = refreshMs > 0 ? window.setInterval(fetchRepos, refreshMs) : undefined

    return () => {
      cancelled = true
      controller?.abort()
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [username, perPage, refreshMs])

  return { repos, loading, error }
}
