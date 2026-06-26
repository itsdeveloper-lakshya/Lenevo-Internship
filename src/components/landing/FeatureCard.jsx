// FeatureCard.jsx
// A small reusable "card" that displays one feature: an icon, a title,
// and a short description. This demonstrates component reusability and
// props — the same component is rendered multiple times on the Landing
// Page with different data passed in.
//
// Props:
//   icon        - emoji or icon string shown inside the colored badge
//   title       - feature title
//   description - short explanation of the feature
//   color       - accent color used for the icon badge (optional, has a default)

const FeatureCard = ({ icon, title, description, color = 'var(--color-primary)' }) => (
  <div className="card card--hover" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
    {/* Icon badge — background/border color is derived from the `color` prop */}
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 'var(--radius-lg)',
        background: `${color}22`, // 22 = ~13% opacity hex suffix
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        margin: '0 auto var(--space-5)',
        border: `1px solid ${color}44`, // 44 = ~27% opacity hex suffix
      }}
    >
      {icon}
    </div>

    <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>{title}</h3>
    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{description}</p>
  </div>
)

export default FeatureCard
