import RichText from '../../../RichText';
import ProfileShell, { LockScreen } from '../../../profile/ProfileHeader';
import { getServerAccess, hasFullAccess } from '@/lib/access';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchCathedralBySlug } from '@/lib/sheets';
import { DIMENSION_SECTIONS, DIMENSION_LABELS } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = await fetchCathedralBySlug(params.slug);
  if (!c) return { title: 'Cathedral not found' };
  return { title: `${c.cathedralName} — The Details` };
}

export default async function CathedralDetails({ params }: { params: { slug: string } }) {
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
    active: 'details' as const,
  };
  if (!full) {
    return (
      <ProfileShell head={head}>
        <LockScreen signedIn={access.signedIn} name={c.cathedralName} />
      </ProfileShell>
    );
  }
  if (!c.audited) {
    return (
      <ProfileShell head={head}>
        <div className="note">
          This cathedral is in the ParishVox index; its full dimension-by-dimension audit
          is being prepared and will appear on this tab. The cathedral audits roll out
          diocese by diocese.
        </div>
      </ProfileShell>
    );
  }
  return (
    <ProfileShell head={head}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The details</h2>
      {DIMENSION_SECTIONS.map((section) => {
        // The platform dimension is not displayed (no vendor naming in
        // profiles; a host/designer credit, when one exists, lives in the
        // standardized Overview slot instead).
        const keys = section.keys.filter((k) => k !== 'platform_tier');
        const filled = keys.filter((k) => c.dimensions[k]);
        if (!filled.length) return null;
        const title = section.title === 'Platform & Findability' ? 'Findability' : section.title;
        return (
          <div key={section.title} className="dim-section">
            <h2>{title}</h2>
            {filled.map((k) => (
              <div key={k} className="dim">
                <h4>{DIMENSION_LABELS[k]}</h4>
                <RichText text={c.dimensions[k]} />
              </div>
            ))}
          </div>
        );
      })}
    </ProfileShell>
  );
}
