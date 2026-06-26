// CTABanner.jsx
// "Call to action" banner placed near the bottom of the Landing Page,
// right before the Footer. Its only job is to nudge the visitor toward
// signing up, so it's a simple, self-contained component with no props.

import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const CTABanner = () => (
  <section style={{ padding: 'var(--space-20) 0' }}>
    <div className="container">
      {/* Gradient panel that contains the heading, copy, and button */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.2) 0%, rgba(0,212,170,0.1) 100%)',
          border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-16)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft radial glow behind the content, purely decorative */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(108,99,255,0.15), transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: 'var(--space-4)' }}>
            Ready to Build Your <span className="gradient-text">Learning Path?</span>
          </h2>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-lg)',
              maxWidth: 560,
              margin: '0 auto var(--space-8)',
            }}
          >
            Join thousands of students who use SkillPath AI to learn faster,
            build projects, and land their dream jobs.
          </p>

          <Link to="/register">
            <button className="btn btn--accent btn--lg">
              Get Your Free Roadmap <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export default CTABanner
