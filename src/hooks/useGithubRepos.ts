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
          Accept: 'application/vnd.github+json',
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

        const freshRepos = response.data
          .filter((repo) => !repo.archived)
          .sort((a, b) => new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime())

        if (!cancelled) {
          setRepos(freshRepos)
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
