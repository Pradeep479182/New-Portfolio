/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useGithubRepos, type Repo } from '../hooks/useGithubRepos'
import { useGithubStats } from '../hooks/useGithubStats'

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const motionValue = useMotionValue(0)

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.25,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplay(Math.round(latest).toLocaleString())
      },
    })

    return () => controls.stop()
  }, [value, motionValue])

  return <span>{display}{suffix}</span>
}

function buildLinePath(points) {
  const width = 500
  const height = 210
  const maxValue = Math.max(...points.map((point) => point.count), 1)
  const stepX = width / Math.max(points.length - 1, 1)

  return points
    .map((point, index) => {
      const x = index * stepX
      const y = height - (point.count / maxValue) * (height - 32)
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function HeatmapLegend() {
  return (
    <div className="heatmap-legend">
      <span>Less</span>
      <div className="heatmap-legend-scale">
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`heatmap-square level-${level}`} />
        ))}
      </div>
      <span>More</span>
    </div>
  )
}

export function GithubStats() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Pradeep479182'
  const { stats, loading, error } = useGithubStats(username)
  const { repos, loading: reposLoading } = useGithubRepos(username, 6, 300000)

  const latestRepos = useMemo(() => (repos.length ? repos : []), [repos])
  const summaryCards = useMemo(() => {
    if (!stats) return []
    return [
      { label: 'Total Contributions', value: stats.totalContributions },
      { label: 'Current Streak', value: stats.currentStreak },
      { label: 'Longest Streak', value: stats.longestStreak },
      { label: 'Public Repositories', value: stats.publicRepos },
      { label: 'Followers', value: stats.followers },
      { label: 'Following', value: stats.following },
      { label: 'Total Stars', value: stats.totalStars },
      { label: 'Commits', value: stats.totalCommits ?? 0 },
      { label: 'Pull Requests', value: stats.totalPullRequests ?? 0 },
      { label: 'Issues', value: stats.totalIssues ?? 0 },
    ]
  }, [stats])

  const languageUsage = stats?.languageUsage ?? []
  const trendPoints = stats?.monthlyTrend ?? []

  return (
    <section id="github-stats" className="section-band px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.8 }}
          className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="eyebrow mb-4">GitHub Growth</div>
            <h2 className="section-title">GitHub Stats & Activity</h2>
          </div>
          <p className="max-w-2xl text-slate-300">
            Visualize your connected GitHub account with a premium stats dashboard, contribution heatmap, trend chart, repo highlights, and achievement badges.
          </p>
        </motion.div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel border-cyan-300/20 bg-slate-950/90 p-8 text-center"
          >
            <p className="text-lg font-semibold text-white">GitHub data could not be loaded.</p>
            <p className="mt-3 text-slate-300">{error}</p>
            <a href="#github-stats" className="glow-button mt-6 inline-flex">
              Refresh on reload
            </a>
          </motion.div>
        ) : (
          <>
            <div className="github-grid">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.85, delay: 0.05 }}
                className="glass-panel github-summary p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Connected GitHub</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">{stats?.login}</h3>
                    <p className="mt-2 max-w-xl text-slate-300">{stats?.bio ?? 'Live GitHub statistics connected from your portfolio account.'}</p>
                  </div>
                  <div className="user-chip">
                    <img src={stats?.avatarUrl ?? '/avatar-placeholder.png'} alt={`${stats?.login} avatar`} />
                    <div>
                      <span className="block text-sm text-slate-300">GitHub Profile</span>
                      <a href={stats?.profileUrl} target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-white">
                        @{stats?.login}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {!stats && (
                    <>{Array.from({ length: 4 }).map((_, idx) => (
                      <div key={idx} className="stats-skeleton" />
                    ))}</>
                  )}
                  {stats && summaryCards.slice(0, 4).map((card) => (
                    <motion.div
                      key={card.label}
                      whileHover={{ y: -3 }}
                      className="stats-card"
                    >
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
                      <p className="text-3xl font-bold text-white">
                        <CountUp value={card.value} />
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.85, delay: 0.12 }}
                className="glass-panel github-heatmap p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Contribution heatmap</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Yearly consistency</h3>
                  </div>
                  <span className="text-sm text-slate-400">Live refresh on reload</span>
                </div>

                <div className="mt-6 heatmap-grid">
                  {loading && Array.from({ length: 52 }).map((_, index) => (
                    <div key={index} className="heatmap-day heatmap-skeleton" />
                  ))}
                  {stats?.contributionCalendar.map((week, weekIndex) => (
                    <div key={weekIndex} className="heatmap-week">
                      {week.map((day) => (
                        <div
                          key={day.date}
                          className="heatmap-day"
                          title={`${day.count} contributions on ${day.date}`}
                          style={{ backgroundColor: day.color }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <HeatmapLegend />
              </motion.div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: 0.08 }}
                className="glass-panel p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Coding Growth</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Contribution trend</h3>
                  </div>
                  <div className="text-slate-400 text-sm">
                    Last {trendPoints.length} months
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]/80 p-4 ring-1 ring-white/5">
                  <svg viewBox="0 0 500 220" className="timeline-chart">
                    <defs>
                      <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#56d8fe" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <path
                      d={buildLinePath(trendPoints)}
                      fill="none"
                      stroke="url(#trendGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {trendPoints.map((point, index) => {
                      const x = (500 / Math.max(trendPoints.length - 1, 1)) * index
                      const maxValue = Math.max(...trendPoints.map((p) => p.count), 1)
                      const y = 210 - (point.count / maxValue) * 178
                      return (
                        <circle key={point.label} cx={x} cy={y} r="5" fill="#38bdf8" opacity="0.95" />
                      )
                    })}
                  </svg>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {trendPoints.slice(-3).map((point) => (
                    <div key={point.label} className="trend-pill">
                      <span className="text-sm text-slate-400">{point.label}</span>
                      <span className="text-lg font-semibold text-white">{point.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: 0.12 }}
                className="glass-panel p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Language usage</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Top languages</h3>
                  </div>
                  <span className="text-slate-400 text-sm">Live from repos</span>
                </div>

                <div className="mt-6 space-y-4">
                  {loading && Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="lang-skeleton" />
                  ))}
                  {languageUsage.map((language) => (
                    <div key={language.language} className="language-row">
                      <div className="language-label">
                        <span className="language-dot" style={{ backgroundColor: language.color }} />
                        <span>{language.language}</span>
                      </div>
                      <div className="language-bar-shell">
                        <div className="language-bar-fill" style={{ width: `${language.percent}%`, background: language.color }} />
                      </div>
                      <span className="text-sm text-slate-300">{language.percent}%</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 badge-grid">
                  {stats?.achievements.map((badge) => (
                    <span key={badge} className="badge-pill">{badge}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.8, delay: 0.09 }}
              className="glass-panel mt-10 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Latest repositories</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Recent GitHub work</h3>
                </div>
                <span className="text-slate-400 text-sm">{reposLoading ? 'Loading...' : `${latestRepos.length} repositories`}</span>
              </div>

              <div className="mt-6 repo-list">
                {reposLoading && Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="repo-skeleton" />
                ))}
                {!reposLoading && latestRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="repo-item"
                  >
                    <div className="repo-header">
                      <h4>{repo.name.replaceAll('-', ' ')}</h4>
                      <span>{repo.language ?? 'Unknown'}</span>
                    </div>
                    <p className="repo-description">{repo.description ?? 'No description available.'}</p>
                    <div className="repo-meta">
                      <span>★ {repo.stargazers_count ?? 0}</span>
                      <span>⎇ {repo.fork ? 'Fork' : 'Source'}</span>
                      <span>{repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Updated recently'}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
