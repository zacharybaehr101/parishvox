'use client';

// "Things to borrow" as an in-flow Overview section (2026-11-10 spec: below
// "What we love" and "Where it can grow", no longer a sidebar). Each item
// carries a 💡 button that adds the practice to the user's To-Do list.

import { borrowItems } from '@/lib/borrow';
import { solutionForText } from '@/lib/solutions';
import { AddTodoButton } from './ProfileBits';

export default function BorrowSection({
  fromName,
  slug,
  kind = 'parish',
  loveText,
  gapText,
  firstOnly = false,
}: {
  fromName: string;
  slug: string;
  kind?: 'parish' | 'cathedral';
  loveText: string;
  gapText?: string;
  firstOnly?: boolean;
}) {
  const { borrows, gap } = borrowItems(loveText, gapText);
  const shown = firstOnly ? borrows.slice(0, 1) : borrows;
  if (!shown.length && !gap) return null;
  return (
    <div className="borrow-flow">
      <h2>Things to borrow</h2>
      <p className="borrow-sub">Practices from {fromName} worth copying at your own parish.</p>
      {shown.map((b, i) => (
        <div key={i} className="borrow-item">
          <div className="borrow-lead">{b.lead}</div>
          {b.summary && <p>{b.summary}</p>}
          {!firstOnly && (
            <div style={{ marginTop: '0.4rem' }}>
              <AddTodoButton
                text={b.summary ? `${b.lead} — ${b.summary}` : b.lead}
                sourceSlug={slug}
                sourceName={fromName}
                sourceKind={kind}
              />
            </div>
          )}
        </div>
      ))}
      {!firstOnly && gap && (
        <div className="borrow-item gap">
          <div className="borrow-lead">The gap to close</div>
          <p>{gap.lead}{gap.summary ? ` — ${gap.summary}` : ''}</p>
          {(() => {
            const sol = solutionForText(gapText || '');
            return sol ? (
              <a className="page-link" href={`/solutions/${sol.slug}`}>
                Learn more: {sol.title} →
              </a>
            ) : null;
          })()}
        </div>
      )}
      <a className="borrow-more" href="/exemplars">More patterns in the Playbook →</a>
    </div>
  );
}
