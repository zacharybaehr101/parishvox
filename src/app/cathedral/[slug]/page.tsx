import RichText from '../../RichText';
import ProfileShell, { LockScreen, VendorCreditLine } from '../../profile/ProfileHeader';
import BorrowSection from '../../profile/BorrowSection';
import { AuditRequestForm } from '../../profile/ProfileBits';
import { solutionForText } from '@/lib/solutions';
import { borrowItems } from '@/lib/borrow';
import { getServerAccess, hasFullAccess } from '@/lib/access';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCathedralBySlug } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

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
  const access = await getServerAccess();
  const full = hasFullAccess(access, { kind: 'cathedral', slug: c.id, diocese: c.diocese });
  const faq = c.dimensions.faq_page?.match(/\d\s*\/\s*7/)?.[0]?.replace(/\s/g, '');
  const head = {
    kind: 'cathedral' as const,
    slug: c.id,
    name: c.cathedralName,
    diocese: c.diocese,
    city: c.city,
    state: c.state,
    websiteUrl: c.websiteUrl,
    faqScore: faq,
    thumbnail: c.thumbnail,
    active: 'overview' as const,
  };

  if (!full) {
    const first = borrowItems(c.whatWeLove || '').borrows[0];
    return (
      <ProfileShell head={head}>
        {!c.audited && (
          <div className="note">
            This cathedral is in the ParishVox index; its full audit is being prepared.
            The cathedral audits roll out diocese by diocese.
          </div>
        )}
        {first && (
          <div className="borrow-flow">
            <h2>Things to borrow</h2>
            <p className="borrow-sub">One practice from {c.cathedralName} worth copying — the full list is inside.</p>
            <div className="borrow-item">
              <div className="borrow-lead">{first.lead}</div>
              {first.summary && <p>{first.summary}</p>}
            </div>
          </div>
        )}
        <LockScreen signedIn={access.signedIn} name={c.cathedralName} />
        <VendorCreditLine slug={c.id} />
      </ProfileShell>
    );
  }

  return (
    <ProfileShell head={head}>
      {!c.audited && (
        <div className="note" style={{ marginBottom: '1rem' }}>
          This cathedral is in the ParishVox index; its full 42-dimension audit is being
          prepared. The cathedral audits roll out diocese by diocese.
        </div>
      )}
      {c.whatWeLove && (
        <div className="card love" style={{ marginBottom: '1rem' }}>
          <h3>What we love</h3>
          <RichText text={c.whatWeLove} />
        </div>
      )}
      {c.areasOfOpportunity && (
        <div className="card grow" style={{ marginBottom: '1rem' }}>
          <h3>Where it can grow</h3>
          <RichText text={c.areasOfOpportunity} />
          {(() => {
            const sol = solutionForText(c.areasOfOpportunity || '');
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
        fromName={c.cathedralName}
        slug={c.id}
        kind="cathedral"
        loveText={c.whatWeLove || ''}
        gapText={c.areasOfOpportunity}
      />
      <AuditRequestForm slug={c.id} name={c.cathedralName} websiteUrl={c.websiteUrl} />
      <VendorCreditLine slug={c.id} />
    </ProfileShell>
  );
}
