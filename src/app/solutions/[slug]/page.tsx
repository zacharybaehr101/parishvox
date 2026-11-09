import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SOLUTIONS } from '@/lib/solutions';

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUTIONS.find((x) => x.slug === slug);
  return { title: s ? `${s.title} — ParishVox Solutions` : 'Solutions — ParishVox' };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SOLUTIONS.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = SOLUTIONS.filter((x) => x.slug !== slug && x.verb === s.verb);

  return (
    <section className="section">
      <div className="container">
        <div className="panel">
          <span className="badge">{s.verb}</span>{' '}
          <Link href="/solutions" style={{ fontSize: '0.85rem' }}>← All solutions</Link>
          <h1 style={{ fontSize: '1.9rem', margin: '0.5rem 0' }}>{s.title}</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: '65ch' }}>{s.promise}</p>

          <h2 className="solution-h2">The principle</h2>
          <p style={{ maxWidth: '70ch' }}>{s.principle}</p>

          <h2 className="solution-h2">The fix</h2>
          <ul className="fix-list">
            {s.fix.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <h2 className="solution-h2">Parishes &amp; cathedrals that do this well</h2>
          <p style={{ marginBottom: '1rem' }}>
            From the ParishVox audits — borrow what fits your parish.
          </p>
          <div className="page-rows">
            {s.exemplars.map((e, i) => (
              <div key={i} className="page-row">
                <div className="page-rail">
                  <span>{e.place}</span>
                </div>
                <div className="page-body">
                  <p className="page-primary">
                    <Link href={e.href}><b>{e.name}</b></Link>
                  </p>
                  <p style={{ fontSize: '0.92rem' }}>{e.note}</p>
                  <Link className="page-link" href={e.href}>See the full profile →</Link>
                </div>
              </div>
            ))}
          </div>

          {others.length > 0 && (
            <p style={{ marginTop: '2rem' }}>
              More under {s.verb}:{' '}
              {others.map((o, i) => (
                <span key={o.slug}>
                  {i > 0 && ' · '}
                  <Link href={`/solutions/${o.slug}`}>{o.title}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
