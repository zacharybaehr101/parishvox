'use client';

// To-Do / Idea list (💡): practices a member spotted in a profile and wants
// to add to their own website. Check the box when it's live on their site.
// Stored in Clerk unsafeMetadata via useUserData().

import { useUserData } from '../user-data';
import { canUseTodo } from '@/lib/access-shared';

export default function TodoPage() {
  const d = useUserData();
  const open = d.todos.filter((t) => !t.done);
  const done = d.todos.filter((t) => t.done);
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>Your To-Do list</h1>
          <p>
            Ideas borrowed from other parishes, waiting to be added to your own site.
            Check one off when it&apos;s live.
          </p>
        </div>
        {!d.isLoaded ? (
          <p>Loading…</p>
        ) : !d.isSignedIn ? (
          <div className="note">
            <a href="/sign-in">Sign in</a> to see your To-Do list — or{' '}
            <a href="/sign-up">create a free account</a> to get started.
          </div>
        ) : !canUseTodo(d.tier) ? (
          <div className="note">
            The To-Do / Idea list is a member feature (Starter and up) — it turns what you
            read in the profiles into a working checklist for your own site.{' '}
            <a href="/pricing">See the plans →</a>
          </div>
        ) : d.todos.length === 0 ? (
          <div className="note">
            Nothing here yet. When a profile shows a practice worth copying — a great photo
            gallery, a newcomer FAQ, a giving page — tap <b>💡 Add to my To-Do list</b> on
            the profile and it will land here.
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
              <b>{done.length} of {d.todos.length} ideas added</b> to your site
            </p>
            {open.map((t) => (
              <TodoRow key={t.id} id={t.id} />
            ))}
            {done.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.2rem', margin: '1.5rem 0 0.75rem' }}>Done</h2>
                {done.map((t) => (
                  <TodoRow key={t.id} id={t.id} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );

  function TodoRow({ id }: { id: string }) {
    const t = d.todos.find((x) => x.id === id);
    if (!t) return null;
    const kind = t.sourceKind || 'parish';
    return (
      <div className={`list-row${t.done ? ' done' : ''}`}>
        <input
          type="checkbox"
          checked={t.done}
          style={{ width: '18px', height: '18px', marginTop: '3px', accentColor: 'var(--navy)' }}
          onChange={(e) =>
            void d.saveTodos(d.todos.map((x) => (x.id === id ? { ...x, done: e.target.checked } : x)))
          }
          aria-label="Mark done — added to our website"
        />
        <div className="grow">
          <div style={{ fontWeight: 600, textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--ink-light)', marginTop: '0.2rem' }}>
            Borrowed from{' '}
            <a href={`/${kind}/${t.sourceSlug}`}>{t.sourceName}</a>
          </div>
          <input
            type="text"
            defaultValue={t.note || ''}
            placeholder="Private note — what we'd copy…"
            style={{
              width: '100%',
              marginTop: '0.45rem',
              padding: '6px 8px',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius)',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
            }}
            onBlur={(e) => {
              if ((t.note || '') !== e.target.value) {
                void d.saveTodos(d.todos.map((x) => (x.id === id ? { ...x, note: e.target.value } : x)));
              }
            }}
          />
        </div>
        <button
          type="button"
          className="btn secondary"
          onClick={() => void d.saveTodos(d.todos.filter((x) => x.id !== id))}
        >
          Remove
        </button>
      </div>
    );
  }
}
