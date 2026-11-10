import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'ParishVox plans: Free, Starter for one parish, Team and Diocese Plus for one diocese, Agency, and Agency + Platform with the "Website by" credit.',
};

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    blurb: 'The library: best practices, open to all.',
    features: [
      'All 12 Solutions best-practice guides',
      'Exemplar Playbook and search',
      'Profile teasers (headline + first borrow idea)',
      'Claim one parish — first in the re-audit queue',
    ],
    featured: false,
  },
  {
    name: 'Starter',
    price: '$19',
    blurb: 'For one parish — its staff, pastor, and volunteers.',
    features: [
      'Full profile of 1 chosen parish, all tabs',
      '25 favorites (your Imitation list)',
      'To-Do / Idea list (💡) with done-tracking',
      '1 on-demand audit per year',
      '3 seats',
    ],
    featured: false,
  },
  {
    name: 'Team',
    price: '$79',
    blurb: 'For a diocesan communications office.',
    features: [
      'Full profiles of 1 chosen diocese — every audited parish + cathedral',
      '200 favorites, collections shared with your seats',
      'To-Do / Idea list (💡)',
      '4 on-demand audits per year across the diocese',
      'CSV export of your diocese',
      '20 seats — need more? Contact us for a small per-seat fee',
    ],
    featured: true,
  },
  {
    name: 'Diocese Plus',
    price: '$199',
    blurb: 'For a big diocese or archdiocese.',
    features: [
      'Everything in Team, diocese-wide',
      '75 seats',
      '500 favorites',
      '12 on-demand audits per year',
      'Diocese benchmarks across your own parishes',
      'Full diocese export + quarterly re-check digest',
    ],
    featured: false,
  },
  {
    name: 'Agency',
    price: '$349',
    blurb: 'For agencies and consultants working across dioceses.',
    features: [
      'Full profiles in all dioceses',
      'Unlimited favorites and compares',
      'Per-client collections and share links',
      'Full corpus export',
      '12 on-demand audits per year (extras $150 each)',
      '15 seats per client workspace',
    ],
    featured: false,
  },
  {
    name: 'Agency + Platform',
    price: '$549',
    blurb: 'For website hosts and design shops: Agency, plus your credit on your work.',
    features: [
      'Everything in Agency',
      'Small “Website by / Site design by” logo, name, and link credit on every profile of a parish you host or designed',
      'A public portfolio page listing all your parishes',
      'Verified-host badge — credits never affect scores or findings',
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
            Free teaches; membership shows — and membership is scoped. You pay for depth in
            your parish or your diocese, not for the whole country. Agencies, who work
            across dioceses, pay for the whole corpus.
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
              <a className={`btn${t.featured ? '' : ' secondary'}`} href="/sign-up">
                Get started
              </a>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--ink-light)' }}>
          Founding-member period: plans are granted manually — create a free account, then
          contact us and we&apos;ll set your plan, your chosen parish or diocese, and your
          seats. Online checkout (Stripe) follows; the access rules won&apos;t change.
          Diocese coverage note: a diocese plan includes every parish we&apos;ve audited
          there today, plus every future audit in that diocese automatically.
        </p>
      </div>
    </section>
  );
}
