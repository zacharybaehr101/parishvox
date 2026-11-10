import RichText from '../../../RichText';
import ProfileShell, { LockScreen } from '../../../profile/ProfileHeader';
import { getServerAccess, hasFullAccess } from '@/lib/access';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchParishBySlug } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await fetchParishBySlug(params.slug);
  if (!p) return { title: 'Parish not found' };
  return { title: `${p.parishName} — The Details` };
}

export default async function ParishDetails({ params }: { params: { slug: string } }) {
  const p = await fetchParishBySlug(params.slug);
  if (!p) notFound();
  const access = await getServerAccess();
  const full = hasFullAccess(access, { kind: 'parish', slug: p.id, diocese: p.diocese });
  const head = {
    kind: 'parish' as const,
    slug: p.id,
    name: p.parishName,
    diocese: p.diocese,
    city: p.city,
    state: p.state,
    websiteUrl: p.websiteUrl,
    faqScore: p.faqScore,
    thumbnail: p.thumbnail,
    active: 'details' as const,
  };
  if (!full) {
    return (
      <ProfileShell head={head}>
        <LockScreen signedIn={access.signedIn} name={p.parishName} />
      </ProfileShell>
    );
  }
  // Parishes carry highlight-level detail today (the dimension-level parish
  // detail arrives with the new-format scans); show everything that exists.
  return (
    <ProfileShell head={head}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The details</h2>
      <div className="dim-section">
        <h2>First impression</h2>
        <div className="dim">
          <h4>Newcomer FAQ (Gloriam 0–7)</h4>
          <p>
            {p.faqScore
              ? `${p.parishName} scores ${p.faqScore} on the seven newcomer questions: bathrooms/changing tables, what to wear, who to ask for help, how to become Catholic, cry room/children, what if I don't know what I'm doing at Mass, and Communion eligibility.`
              : 'No FAQ score has been recorded for this parish yet.'}
          </p>
        </div>
        <div className="dim">
          <h4>Audit status</h4>
          <p>
            {p.audited
              ? 'This parish has a full ParishVox audit in the current corpus.'
              : 'This parish is in the roster with a verified website; its full audit is scheduled in the diocese-by-diocese rollout.'}
          </p>
        </div>
      </div>
      {p.highlightAsset && (
        <div className="dim-section">
          <h2>Standout asset, in full</h2>
          <div className="dim">
            <RichText text={p.highlightAsset} />
          </div>
        </div>
      )}
      {p.highlightOpportunity && (
        <div className="dim-section">
          <h2>Best opportunity, in full</h2>
          <div className="dim">
            <RichText text={p.highlightOpportunity} />
          </div>
        </div>
      )}
      <div className="note" style={{ marginTop: '1.5rem' }}>
        Dimension-by-dimension detail (first impression, becoming Catholic, worship,
        bulletins and events, giving, photography, and more) is published for parishes
        scanned in the new content format, and appears on this tab as those scans land.
      </div>
    </ProfileShell>
  );
}
