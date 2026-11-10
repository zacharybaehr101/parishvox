import PageRows from '../../../PageRows';
import ProfileShell, { LockScreen } from '../../../profile/ProfileHeader';
import { getServerAccess, hasFullAccess } from '@/lib/access';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCathedralBySlug, fetchPagesForInstitution } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = await fetchCathedralBySlug(params.slug);
  if (!c) return { title: 'Cathedral not found' };
  return { title: `${c.cathedralName} — Key Pages, Up Close` };
}

export default async function CathedralKeyPages({ params }: { params: { slug: string } }) {
  const c = await fetchCathedralBySlug(params.slug);
  if (!c) notFound();
  const access = await getServerAccess();
  const full = hasFullAccess(access, { kind: 'cathedral', slug: c.id, diocese: c.diocese });
  const head = {
    kind: 'cathedral' as const,
    slug: c.id,
    name: c.cathedralName,
    diocese: c.diocese,
    city: c.city,
    state: c.state,
    websiteUrl: c.websiteUrl,
    thumbnail: c.thumbnail,
    active: 'key-pages' as const,
  };
  if (!full) {
    return (
      <ProfileShell head={head}>
        <LockScreen signedIn={access.signedIn} name={c.cathedralName} />
      </ProfileShell>
    );
  }
  const pages = await fetchPagesForInstitution(c.cathedralName);
  return (
    <ProfileShell head={head}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Key pages, up close</h2>
      <p style={{ marginBottom: '1rem' }}>
        The pillar pages a newcomer actually lands on — what each one says and how it invites.
      </p>
      {pages.length > 0 ? (
        <PageRows pages={pages} todoSource={{ slug: c.id, name: c.cathedralName, kind: 'cathedral' }} />
      ) : (
        <div className="note">
          No page-by-page breakdown has been published for this cathedral yet. Breakdowns
          are added with each audit, starting with the homepage, Mass times, and newcomer pages.
        </div>
      )}
    </ProfileShell>
  );
}
