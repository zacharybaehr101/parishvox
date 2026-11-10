import RichText from '../../RichText';
import ProfileShell, { LockScreen, VendorCreditLine } from '../../profile/ProfileHeader';
import BorrowSection from '../../profile/BorrowSection';
import { AuditRequestForm } from '../../profile/ProfileBits';
import { solutionForText } from '@/lib/solutions';
import { borrowItems } from '@/lib/borrow';
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
  return {
    title: `${p.parishName} (${p.city}, ${p.state}) — Website Audit`,
    description: `ParishVox audit of ${p.parishName}, ${p.diocese}: newcomer doorway, bulletins, events, giving, and photography.`,
  };
}

export default async function ParishPage({ params }: { params: { slug: string } }) {
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
    active: 'overview' as const,
  };

  if (!full) {
    // Teaser: identity + FAQ score (in the header) + the first borrow item.
    const first = borrowItems(p.highlightAsset || '').borrows[0];
    return (
      <ProfileShell head={head}>
        {!p.audited && (
          <div className="note">
            This parish is in the ParishVox roster with a verified website. Full audits are
            drawn from the national stratified sample, diocese by diocese.
          </div>
        )}
        {first && (
          <div className="borrow-flow">
            <h2>Things to borrow</h2>
            <p className="borrow-sub">One practice from {p.parishName} worth copying — the full list is inside.</p>
            <div className="borrow-item">
              <div className="borrow-lead">{first.lead}</div>
              {first.summary && <p>{first.summary}</p>}
            </div>
          </div>
        )}
        <LockScreen signedIn={access.signedIn} name={p.parishName} />
        <VendorCreditLine slug={p.id} />
      </ProfileShell>
    );
  }

  return (
    <ProfileShell head={head}>
      {!p.audited && (
        <div className="note" style={{ marginBottom: '1rem' }}>
          This parish is in the ParishVox roster with a verified website. Full audits are
          drawn from the national stratified sample, diocese by diocese.
        </div>
      )}
      {p.highlightAsset && (
        <div className="card love" style={{ marginBottom: '1rem' }}>
          <h3>What we love</h3>
          <RichText text={p.highlightAsset} />
        </div>
      )}
      {p.highlightOpportunity && (
        <div className="card grow" style={{ marginBottom: '1rem' }}>
          <h3>Where it can grow</h3>
          <RichText text={p.highlightOpportunity} />
          {(() => {
            const sol = solutionForText(p.highlightOpportunity || '');
            return sol ? (
              <p style={{ marginTop: '0.6rem' }}>
                <a className="page-link" href={`/solutions/${sol.slug}`}>
                  Learn more: {sol.title} →
                </a>
              </p>
            ) : null;
          })()}
        </div>
      )}
      <BorrowSection
        fromName={p.parishName}
        slug={p.id}
        loveText={p.highlightAsset || ''}
        gapText={p.highlightOpportunity}
      />
      <AuditRequestForm slug={p.id} name={p.parishName} websiteUrl={p.websiteUrl} />
      <VendorCreditLine slug={p.id} />
    </ProfileShell>
  );
}
