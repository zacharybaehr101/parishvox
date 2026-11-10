'use client';

// Interactive profile controls, all backed by Clerk unsafeMetadata through
// useUserData(): ☆ favorite toggle, 💡 add-to-To-Do, parish claim, and the
// on-demand audit request form.

import { useState } from 'react';
import { useUserData, recentAuditRequests, type TodoItem } from '../user-data';
import { favoritesCap, canUseTodo, auditQuota } from '@/lib/access-shared';

const btn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  padding: '5px 12px',
  borderRadius: '999px',
  border: '1px solid var(--border)',
  background: 'var(--white)',
  color: 'var(--navy)',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

function useBusy(): [boolean, (fn: () => Promise<void>) => Promise<void>] {
  const [busy, setBusy] = useState(false);
  return [
    busy,
    async (fn) => {
      setBusy(true);
      try {
        await fn();
      } catch {
        /* Clerk surfaces its own errors; keep the UI steady */
      } finally {
        setBusy(false);
      }
    },
  ];
}

export function FavoriteToggle({
  slug,
  kind,
  name,
}: {
  slug: string;
  kind: 'parish' | 'cathedral';
  name: string;
}) {
  const d = useUserData();
  const [busy, run] = useBusy();
  if (!d.isLoaded || !d.isSignedIn) return null;
  const active = d.favorites.some((f) => f.slug === slug);
  const cap = favoritesCap(d.tier);
  return (
    <button
      type="button"
      style={{ ...btn, ...(active ? { background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)' } : {}) }}
      disabled={busy}
      title={active ? 'Remove from your Imitation list' : 'Save to your Imitation list'}
      onClick={() =>
        run(async () => {
          if (active) {
            await d.saveFavorites(d.favorites.filter((f) => f.slug !== slug));
          } else if (cap === 0) {
            window.alert('Favorites are a member feature — Starter and up. See the pricing page for the plan that fits your parish or diocese.');
          } else if (d.favorites.length >= cap) {
            window.alert(`Your ${d.tier} plan saves up to ${cap} favorites. Remove one, or upgrade for a larger Imitation list.`);
          } else {
            await d.saveFavorites([...d.favorites, { slug, kind, name }]);
          }
        })
      }
    >
      {active ? '★ Saved' : '☆ Save to imitate'}
    </button>
  );
}

export function AddTodoButton({
  text,
  sourceSlug,
  sourceName,
  sourceKind,
  label = '💡 Add to my To-Do list',
}: {
  text: string;
  sourceSlug: string;
  sourceName: string;
  sourceKind?: 'parish' | 'cathedral';
  label?: string;
}) {
  const d = useUserData();
  const [busy, run] = useBusy();
  const [added, setAdded] = useState(false);
  if (!d.isLoaded || !d.isSignedIn) return null;
  const exists = added || d.todos.some((t) => t.sourceSlug === sourceSlug && t.text === text);
  return (
    <button
      type="button"
      style={{ ...btn, fontSize: '0.75rem', padding: '3px 10px', ...(exists ? { background: 'var(--parchment-mid)' } : {}) }}
      disabled={busy || exists}
      onClick={() =>
        run(async () => {
          if (!canUseTodo(d.tier)) {
            window.alert('The To-Do / Idea list is a member feature — Starter and up. See the pricing page for the plan that fits.');
            return;
          }
          const item: TodoItem = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text,
            sourceSlug,
            sourceName,
            sourceKind,
            done: false,
          };
          await d.saveTodos([...d.todos, item]);
          setAdded(true);
        })
      }
    >
      {exists ? '💡 On your To-Do list' : label}
    </button>
  );
}

export function ClaimButton({ slug, name }: { slug: string; name: string }) {
  const d = useUserData();
  const [busy, run] = useBusy();
  if (!d.isLoaded || !d.isSignedIn) return null;
  if (d.claimedParish === slug) {
    return (
      <span style={{ ...btn, cursor: 'default', background: 'var(--navy-light)', borderColor: '#c9d2e6' }}>
        ✓ Your claimed parish — first in the re-audit queue
      </span>
    );
  }
  if (d.claimedParish) {
    return (
      <span style={{ fontSize: '0.8rem', color: 'var(--ink-light)' }}>
        You&apos;ve claimed {d.claimedParishName || 'another parish'} — one free claim per account.
      </span>
    );
  }
  return (
    <button
      type="button"
      style={btn}
      disabled={busy}
      title="Claiming puts this parish first in the re-audit queue"
      onClick={() => run(() => d.claimParish(slug, name))}
    >
      Claim this parish
    </button>
  );
}

export function ProfileActions({
  slug,
  kind,
  name,
}: {
  slug: string;
  kind: 'parish' | 'cathedral';
  name: string;
}) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', margin: '0.25rem 0 1rem' }}>
      <FavoriteToggle slug={slug} kind={kind} name={name} />
      {kind === 'parish' && <ClaimButton slug={slug} name={name} />}
    </div>
  );
}

export function AuditRequestForm({
  slug,
  name,
  websiteUrl,
}: {
  slug: string;
  name: string;
  websiteUrl: string;
}) {
  const d = useUserData();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, run] = useBusy();
  const [url, setUrl] = useState(websiteUrl);
  const [changed, setChanged] = useState('Just want a current read');
  const [focus, setFocus] = useState('');
  const [contact, setContact] = useState('');
  if (!d.isLoaded || !d.isSignedIn) return null;
  const quota = auditQuota(d.tier);
  if (quota === 0) return null;
  const used = recentAuditRequests(d.auditRequests).length;
  const remaining = Math.max(0, quota - used);
  const canPayExtra = d.tier === 'agency' || d.tier === 'platform';

  const input: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    marginTop: '0.25rem',
  };
  const label: React.CSSProperties = { display: 'block', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.8rem' };

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h3>Need a fresh audit of this site?</h3>
      <p style={{ fontSize: '0.9rem' }}>
        Members can request a re-audit on demand. Target turnaround: <b>10 business days</b>.{' '}
        {remaining > 0
          ? `You have ${remaining} of ${quota} included request${quota === 1 ? '' : 's'} left this year.`
          : canPayExtra
            ? 'Your included requests for this year are used — extra audits are $150 each; submit and we\u2019ll confirm before starting.'
            : 'Your included requests for this year are used — the next cycle opens with your plan year, and claimed parishes stay first in the regular re-audit queue.'}
      </p>
      {sent ? (
        <p className="note" style={{ marginTop: '0.75rem' }}>
          Request received for {name}. We&apos;ll confirm by email and aim for the 10-business-day target.
        </p>
      ) : !open ? (
        <button type="button" className="btn" style={{ marginTop: '0.75rem' }} onClick={() => setOpen(true)}>
          Request a fresh audit
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void run(async () => {
              await d.saveAuditRequests([
                ...d.auditRequests,
                {
                  id: `${Date.now()}`,
                  slug,
                  name,
                  url,
                  changed,
                  focus,
                  contact,
                  date: new Date().toISOString().slice(0, 10),
                },
              ]);
              setSent(true);
            });
          }}
        >
          <label style={label}>
            Website URL (confirm it&apos;s current)
            <input style={input} value={url} onChange={(e) => setUrl(e.target.value)} required />
          </label>
          <label style={label}>
            What changed?
            <select style={input} value={changed} onChange={(e) => setChanged(e.target.value)}>
              <option>Just want a current read</option>
              <option>Full redesign</option>
              <option>New pages or sections</option>
              <option>New platform / host</option>
              <option>New parish leadership or focus</option>
            </select>
          </label>
          <label style={label}>
            Anything to focus on? (optional)
            <textarea style={input} rows={3} value={focus} onChange={(e) => setFocus(e.target.value)} />
          </label>
          <label style={label}>
            Contact email for the result
            <input style={input} type="email" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn" disabled={busy}>Send request</button>
            <button type="button" className="btn secondary" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
