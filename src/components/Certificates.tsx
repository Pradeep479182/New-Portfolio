/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import certificateImage from '../assets/Certificate.jpg'

const certificates = [
  {
    id: 1,
    title: 'Prompt Engineering with ChatGPT',
    issuer: 'Simplilearn SkillUp',
    date: 'May 2026',
    color: 'from-cyan-500 to-blue-500',
    code: '10239626',
    image: certificateImage,
  },
]

const certificateVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const stackVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export function Certificates() {
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const initialCount = 4
  const displayedCerts = isExpanded ? certificates : certificates.slice(0, initialCount)
  const hasMore = certificates.length > initialCount

  return (
    <>
      <section id="certificates" className="section-band px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-left">
            <div className="eyebrow mb-4">Professional credentials</div>
            <h2 className="section-title">Certificates</h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-300">
              Continuous learning and professional development across frontend technologies, design systems, and motion engineering.
            </p>
          </div>

          <div className="certificate-stack-container">
            {displayedCerts.map((cert, index) => (
              <motion.article
                key={cert.id}
                custom={index}
                variants={certificateVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="certificate-card-wrapper"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className={`certificate-card bg-gradient-to-br ${cert.color}`}>
                  {/* Stacked effect background layers */}
                  {[2, 1].map((layer) => (
                    <motion.div
                      key={layer}
                      custom={index + layer * 0.3}
                      variants={stackVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="certificate-layer"
                      style={{
                        transform: `translateY(${layer * 8}px) translateX(${layer * 8}px)`,
                      }}
                    />
                  ))}

                  {/* Main card content */}
                  <motion.div
                    className="certificate-content"
                    whileHover={{ y: -8, rotateX: -2 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="certificate-header">
                      <div className="certificate-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9L12 13l6-4" />
                          <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                        </svg>
                      </div>
                      <span className="certificate-year">{cert.date}</span>
                    </div>

                    <h3 className="certificate-title">{cert.title}</h3>
                    <p className="certificate-issuer">{cert.issuer}</p>

                    <div className="certificate-badge">
                      <span>Verified</span>
                    </div>

                    {cert.code && <p className="certificate-code">Code: {cert.code}</p>}

                    <motion.button
                      onClick={() => setSelectedCertId(cert.id)}
                      className="certificate-view-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Certificate
                    </motion.button>
                  </motion.div>

                  {/* Shimmer effect overlay */}
                  <div className="certificate-shimmer" />
                </div>
              </motion.article>
            ))}
          </div>

          {/* More Button */}
          <AnimatePresence>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                >
                  {isExpanded ? 'Show Less' : `Show More (${certificates.length - initialCount} more)`}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.65 }}
            className="mt-16 grid grid-cols-3 gap-4 md:grid-cols-3 md:gap-6"
          >
            {[
              { value: certificates.length.toString(), label: 'Certificates' },
              { value: 'Verified', label: 'Status' },
              { value: 'Active', label: 'Learning' },
            ].map((stat) => (
              <div key={stat.label} className="metric-tile text-center md:text-left">
                <span>{stat.value}</span>
                <small>{stat.label}</small>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertId(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelectedCertId(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 hover:bg-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Certificate image */}
              {certificates.find((c) => c.id === selectedCertId)?.image && (
                <img
                  src={certificates.find((c) => c.id === selectedCertId)?.image}
                  alt="Certificate"
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
