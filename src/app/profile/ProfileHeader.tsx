// Shared profile chrome for parish + cathedral profiles: header (small
// thumbnail only — the large hero screenshot is gone per the 2026-11-10
// spec, and the 'platform' header line is removed entirely), the sticky
// profile tab nav, the teaser lock screen, and the vendor credit slot.

import Thumb from '../Thumb';
import { ProfileActions } from './ProfileBits';
import { vendorCreditFor } from '@/lib/vendor-credits';

export type ProfileTab = 'overview' | 'key-pages' | 'details' | 'social';

export interface ProfileHeadProps {
  kind: 'parish' | 'cathedral';
  slug: string;
  name: string;
  diocese: string;
  city: string;
  state: string;
  websiteUrl?: string;
  faqScore?: string;
  thumbnail: string;
  active: ProfileTab;
  hasSocial?: boolean;
}

export function profileBase(kind: 'parish' | 'cathedral', slug: string): string {
  return kind === 'parish' ? `/parish/${slug}` : `/cathedral/${slug}`;
}

export default function ProfileShell({
  head,
  children,
}: {
  head: ProfileHeadProps;
  children: React.ReactNode;
}) {
  const base = profileBase(head.kind, head.slug);
  const tabs: { key: ProfileTab; label: string; href: string }[] = [
    { key: 'overview', label: 'Overview', href: base },
    { key: 'key-pages', label: 'Key Pages, Up Close', href: `${base}/key-pages` },
    { key: 'details', label: 'The Details', href: `${base}/details` },
    ...(head.hasSocial
      ? [{ key: 'social' as ProfileTab, label: 'Social', href: `${base}/social` }]
      : []),
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="panel">
          <span className="badge">{head.kind === 'parish' ? 'Parish' : 'Cathedral audit'}</span>{' '}
          <span className="badge red">{head.diocese}</span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginTop: '0.75rem' }}>
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
              <h1 style={{ fontSize: '2.2rem', margin: 0 }}>{head.name}</h1>
              <div className="kv" style={{ margin: '0.5rem 0 0.75rem' }}>
                <span><b>City:</b> {head.city}, {head.state}</span>
                {head.websiteUrl && (
                  <span>
                    <b>Website:</b>{' '}
                    <a href={head.websiteUrl} target="_blank" rel="noreferrer">
                      {head.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  </span>
                )}
                {head.faqScore && (
                  <span><b>Newcomer FAQ score:</b> {head.faqScore} (Gloriam 0–7)</span>
                )}
              </div>
            </div>
            {/* Small thumbnail only — never the enlarged hero. */}
            <div className="profile-thumb">
              <Thumb src={head.thumbnail} alt={`${head.name} homepage`} small />
            </div>
          </div>

          <ProfileActions slug={head.slug} kind={head.kind} name={head.name} />

          <nav className="profile-tabs" aria-label={`${head.name} sections`}>
            {tabs.map((t) => (
              <a
                key={t.key}
                href={t.href}
                className={head.active === t.key ? 'ptab active' : 'ptab'}
                aria-current={head.active === t.key ? 'page' : undefined}
              >
                {t.label}
              </a>
            ))}
          </nav>

          {children}
        </div>
      </div>
    </section>
  );
}

/** Shown instead of gated content when the visitor's tier/scope doesn't
 *  include the full profile. Signed-out visitors are asked to sign in;
 *  signed-in visitors see the plan that would unlock it. */
export function LockScreen({ signedIn, name }: { signedIn: boolean; name: string }) {
  return (
    <div className="note" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginBottom: '0.4rem' }}>Members only</h3>
      <p>
        The full audit of {name} — every dimension, the key pages up close, and the
        practices worth borrowing — is part of ParishVox membership. Access is scoped:
        Starter covers one chosen parish, Team and Diocese Plus cover one chosen
        diocese, and Agency covers them all.
      </p>
      <p style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {signedIn ? (
          <a className="btn" href="/pricing">See the plans</a>
        ) : (
          <>
            <a className="btn" href="/sign-in">Sign in</a>
            <a className="btn secondary" href="/pricing">See the plans</a>
          </>
        )}
      </p>
    </div>
  );
}

/** Small standardized vendor credit (Agency + Platform). Renders nothing
 *  unless a verified credit is registered for this profile slug. */
export function VendorCreditLine({ slug }: { slug: string }) {
  const credit = vendorCreditFor(slug);
  if (!credit) return null;
  return (
    <p className="vendor-credit">
      {credit.role === 'designer' ? 'Site design by ' : 'Website by '}
      <a href={credit.url} target="_blank" rel="noreferrer">
        {credit.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={credit.logoUrl} alt="" className="vendor-logo" />
        )}
        {credit.name}
      </a>
    </p>
  );
}
