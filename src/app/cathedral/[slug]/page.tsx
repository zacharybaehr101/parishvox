import Thumb from '../../Thumb';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCathedralBySlug, fetchPagesForInstitution } from '@/lib/sheets';
import { DIMENSION_SECTIONS, DIMENSION_LABELS } from '@/lib/types';

export const revalidate = 21600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = await fetchCathedralBySlug(params.slug);
  if (!c) return { title: 'Cathedral not found' };
  return {
    title: `${c.cathedralName} (${c.city}, ${c.state}) — Website Audit`,
    description: `ParishVox audit of ${c.cathedralName}, ${c.diocese}: newcomer doorway, bulletins, events, giving, photography, and 42 dimensions of invitation.`,
  };
}

export default async function CathedralPage({ params }: { params: { slug: string } }) {
  const c = await fetchCathedralBySlug(params.slug);
  if (!c) notFound();
  const pages = await fetchPagesForInstitution(c.cathedralName);

  return (
    <section className="section">
      <div className="container">
        <span className="badge">Cathedral audit</span>{' '}
        <span className="badge red">{c.diocese}</span>
        <h1 style={{ fontSize: '2.4rem', marginTop: '0.75rem' }}>{c.cathedralName}</h1>
        <div className="kv" style={{ margin: '0.5rem 0 1rem' }}>
          <span><b>City:</b> {c.city}, {c.state}</span>
          {c.websiteUrl && (
            <span>
              <b>Website:</b>{' '}
              <a href={c.websiteUrl} target="_blank" rel="noreferrer">
                {c.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </span>
          )}
          {c.dimensions.platform_tier && <span><b>Platform:</b> {c.dimensions.platform_tier.split('—')[0].slice(0, 60)}</span>}
        </div>

        <Thumb src={c.thumbnail} alt={`${c.cathedralName} homepage`} wide />

        {c.whatWeLove && (
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>What we love</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{c.whatWeLove}</p>
          </div>
        )}
        {c.areasOfOpportunity && (
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3>Where it can grow</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{c.areasOfOpportunity}</p>
          </div>
        )}

        {!c.audited && (
          <div className="note">
            This cathedral is in the ParishVox index; its full 42-dimension audit is being
            prepared. The cathedral audits roll out diocese by diocese.
          </div>
        )}

        {DIMENSION_SECTIONS.map((section) => {
          const filled = section.keys.filter((k) => c.dimensions[k]);
          if (!filled.length) return null;
          return (
            <div key={section.title} style={{ marginTop: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>{section.title}</h2>
              {filled.map((k) => (
                <div key={k} className="dim">
                  <h4>{DIMENSION_LABELS[k]}</h4>
                  <p>{c.dimensions[k]}</p>
                </div>
              ))}
            </div>
          );
        })}

        {pages.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Key pages, up close</h2>
            <p style={{ marginBottom: '1rem' }}>
              The pillar pages a newcomer actually lands on — what each one says and how it invites.
            </p>
            <div className="grid">
              {pages.map((p, i) => (
                <div key={i} className="card">
                  <span className="badge">{p.pageType}</span>
                  <h3 style={{ marginTop: '0.5rem' }}>
                    {p.pageUrl ? (
                      <a href={p.pageUrl} target="_blank" rel="noreferrer">{p.pageType}</a>
                    ) : (
                      p.pageType
                    )}
                  </h3>
                  {p.primaryMessage && <p><b>Primary message:</b> {p.primaryMessage}</p>}
                  {p.ctaLabels && <p><b>Calls to action:</b> {p.ctaLabels}</p>}
                  {p.whatWeLove && <p><b>What we love:</b> {p.whatWeLove}</p>}
                  {p.areasOfOpportunity && <p><b>Opportunity:</b> {p.areasOfOpportunity}</p>}
                  {p.invitationNote && <p><b>Invitation note:</b> {p.invitationNote}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
