import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'ParishVox plans for parish website designers, content marketers, agencies, and diocesan teams.',
};

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    blurb: 'A first look at how cathedrals invite.',
    features: [
      '3 cathedral profiles per month',
      'Homepage-level audit fields',
      'Diocese coverage index',
      'Newsletter',
    ],
    featured: false,
  },
  {
    name: 'Starter',
    price: '$19',
    blurb: 'For freelancers and single-parish teams.',
    features: [
      'Full cathedral audits — all 42 dimensions',
      'Page-level teardowns',
      'Parish sample profiles',
      'Exemplar Playbook',
    ],
    featured: false,
  },
  {
    name: 'Team',
    price: '$79',
    blurb: 'For web shops and diocesan communications teams.',
    features: [
      'Everything in Starter',
      'Compare up to 5 parishes side by side',
      'Bulletin & events pattern library',
      'New-audit alerts for your dioceses',
    ],
    featured: true,
  },
  {
    name: 'Agency',
    price: '$149',
    blurb: 'For agencies serving many parishes and dioceses.',
    features: [
      'Everything in Team',
      'Unlimited compares and exports',
      'White-label teardown reports',
      'Sector pattern briefings',
    ],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>Pricing</h1>
          <p>
            ParishVox is built for the professionals who build parish websites — designers,
            content marketers, agencies, and vendors. Parish staff get the benchmark context
            they need; agencies get the pattern library.
          </p>
        </div>
        <div className="pricing-grid">
          {TIERS.map((t) => (
            <div key={t.name} className={`price-card${t.featured ? ' featured' : ''}`}>
              <span className="badge">{t.name}</span>
              <div className="price" style={{ marginTop: '0.5rem' }}>
                {t.price}
                <span style={{ fontSize: '0.9rem', color: 'var(--ink-light)' }}>/mo</span>
              </div>
              <p style={{ fontSize: '0.9rem' }}>{t.blurb}</p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={`btn${t.featured ? '' : ' secondary'}`} href="/#subscribe">
                Get started
              </a>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--ink-light)' }}>
          Plans mirror the CampusVox structure while ParishVox completes its launch audits.
          Checkout opens with the full parish database.
        </p>
      </div>
    </section>
  );
}
