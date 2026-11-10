import PageRows from '../../../PageRows';
import ProfileShell, { LockScreen } from '../../../profile/ProfileHeader';
import { getServerAccess, hasFullAccess } from '@/lib/access';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchParishBySlug, fetchPagesForInstitution } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await fetchParishBySlug(params.slug);
  if (!p) return { title: 'Parish not found' };
  return { title: `${p.parishName} — Key Pages, Up Close` };
}

export default async function ParishKeyPages({ params }: { params: { slug: string } }) {
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
    active: 'key-pages' as const,
  };
  if (!full) {
    return (
      <ProfileShell head={head}>
        <LockScreen signedIn={access.signedIn} name={p.parishName} />
      </ProfileShell>
    );
  }
  const pages = await fetchPagesForInstitution(p.parishName);
  return (
    <ProfileShell head={head}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Key pages, up close</h2>
      <p style={{ marginBottom: '1rem' }}>
        The pillar pages a newcomer actually lands on — what each one says and how it invites.
      </p>
      {pages.length > 0 ? (
        <PageRows pages={pages} todoSource={{ slug: p.id, name: p.parishName, kind: 'parish' }} />
      ) : (
        <div className="note">
          No page-by-page breakdown has been published for this parish yet. Parish audits
          roll out diocese by diocese; the page breakdowns are added with each new-format
          scan, starting with the homepage, Mass times, and newcomer pages.
        </div>
      )}
    </ProfileShell>
  );
}
