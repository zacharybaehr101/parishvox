import Thumb from '../../Thumb';
import RichText from '../../RichText';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchParishBySlug, fetchPagesForInstitution } from '@/lib/sheets';

export const revalidate = 21600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await fetchParishBySlug(params.slug);
  if (!p) return { title: 'Parish not found' };
  return {
    title: `${p.parishName} (${p.city}, ${p.state}) — Website Audit`,
    description: `ParishVox audit of ${p.parishName}, ${p.diocese}: newcomer doorway, bulletins, events, giving, and photography.`,
  };
}

export default async function ParishPage({ params }: { params: { slug: string } }) {
  const p = await fetchParishBySlug(params.slug);
  if (!p) notFound();
  const pages = await fetchPagesForInstitution(p.parishName);

  return (
    <section className="section">
      <div className="container">
        <span className="badge">Parish</span>{' '}
        <span className="badge red">{p.diocese}</span>
        <h1 style={{ fontSize: '2.4rem', marginTop: '0.75rem' }}>{p.parishName}</h1>
        <div className="kv" style={{ margin: '0.5rem 0 1rem' }}>
          <span><b>City:</b> {p.city}, {p.state}</span>
          {p.websiteUrl && (
            <span>
              <b>Website:</b>{' '}
              <a href={p.websiteUrl} target="_blank" rel="noreferrer">
                {p.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </span>
          )}
          {p.faqScore && <span><b>Newcomer FAQ score:</b> {p.faqScore} (Gloriam 0–7)</span>}
        </div>

        {!p.audited && (
          <div className="note">
            This parish is in the ParishVox roster with a verified website. Full audits are
            drawn from the national stratified sample, diocese by diocese.
          </div>
        )}

        <Thumb src={p.thumbnail} alt={`${p.parishName} homepage`} wide />

        {p.highlightAsset && (
          <div className="card love" style={{ marginBottom: '1rem' }}>
            <h3>Standout asset</h3>
            <RichText text={p.highlightAsset} />
          </div>
        )}
        {p.highlightOpportunity && (
          <div className="card grow" style={{ marginBottom: '1rem' }}>
            <h3>Best opportunity</h3>
            <RichText text={p.highlightOpportunity} />
          </div>
        )}

        {pages.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Key pages, up close</h2>
            <div className="grid" style={{ marginTop: '1rem' }}>
              {pages.map((pg, i) => (
                <div key={i} className="card">
                  <span className="badge">{pg.pageType}</span>
                  {pg.primaryMessage && <p><b>Primary message:</b> {pg.primaryMessage}</p>}
                  {pg.ctaLabels && <p><b>Calls to action:</b> {pg.ctaLabels}</p>}
                  {pg.whatWeLove && <p><b>What we love:</b> {pg.whatWeLove}</p>}
                  {pg.areasOfOpportunity && <p><b>Opportunity:</b> {pg.areasOfOpportunity}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
