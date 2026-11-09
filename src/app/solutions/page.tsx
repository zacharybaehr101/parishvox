import type { Metadata } from 'next';
import Link from 'next/link';
import { SOLUTIONS } from '@/lib/solutions';

export const metadata: Metadata = {
  title: 'Solutions — ParishVox',
  description:
    'Practical fix guides for parish websites, drawn from the ParishVox framework and proven by audited parishes that already do each task well.',
};

const VERB_ORDER = ['Worship', 'Hear', 'Grow', 'Connect', 'Serve'];

export default function SolutionsIndex() {
  return (
    <section className="section">
      <div className="container">
        <div className="panel">
          <span className="badge">Solutions</span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>Fix guides for parish websites</h1>
          <p style={{ maxWidth: '65ch' }}>
            Each guide takes one task from the ParishVox framework — the principle behind it, the
            concrete fix, and the audited parishes and cathedrals that already do it well, so you
            can borrow what works. Organized by the five verbs of parish life:{' '}
            <b>hear, worship, grow, connect, serve</b>.
          </p>
          {VERB_ORDER.map((verb) => (
            <div key={verb} style={{ marginTop: '2rem' }}>
              <h2 className="solutions-verb">{verb}</h2>
              <div className="grid" style={{ marginTop: '0.75rem' }}>
                {SOLUTIONS.filter((s) => s.verb === verb).map((s) => (
                  <Link key={s.slug} href={`/solutions/${s.slug}`} className="card" style={{ textDecoration: 'none' }}>
                    <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>{s.title}</h3>
                    <p style={{ fontSize: '0.9rem' }}>{s.promise}</p>
                    <span className="chip">{s.exemplars.length} parishes that do it well →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
