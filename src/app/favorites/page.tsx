'use client';

// Favorites — the "Imitation list": profiles a member saves to imitate.
// Stored in Clerk unsafeMetadata via useUserData().

import { useUserData } from '../user-data';
import { favoritesCap } from '@/lib/access-shared';

function profileBase(kind: 'parish' | 'cathedral', slug: string): string {
  return kind === 'parish' ? `/parish/${slug}` : `/cathedral/${slug}`;
}

export default function FavoritesPage() {
  const d = useUserData();
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>Your Imitation list</h1>
          <p>The profiles you&apos;re saving to borrow from — what they do, why it works, and what to copy first.</p>
        </div>
        {!d.isLoaded ? (
          <p>Loading…</p>
        ) : !d.isSignedIn ? (
          <div className="note">
            <a href="/sign-in">Sign in</a> to see your Imitation list — or{' '}
            <a href="/sign-up">create a free account</a> to start claiming and saving.
          </div>
        ) : d.favorites.length === 0 ? (
          <div className="note">
            Nothing saved yet. Open any parish or cathedral profile and tap{' '}
            <b>☆ Save to imitate</b> — it will land here.
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-light)', marginBottom: '1rem' }}>
              {d.favorites.length} saved
              {Number.isFinite(favoritesCap(d.tier)) && ` of ${favoritesCap(d.tier)} on your plan`}
            </p>
            {d.favorites.map((f) => (
              <div key={f.slug} className="list-row">
                <div className="grow">
                  <a href={profileBase(f.kind, f.slug)} style={{ fontWeight: 700, color: 'var(--navy)' }}>
                    {f.name}
                  </a>{' '}
                  <span className="badge" style={{ marginLeft: '0.25rem' }}>{f.kind}</span>
                </div>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => void d.saveFavorites(d.favorites.filter((x) => x.slug !== f.slug))}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
