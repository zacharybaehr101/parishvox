import { solutionForText } from '@/lib/solutions';

// "Things to borrow" sidebar for profile pages.
// Built from the audit's own highlight text: each numbered/pipe-separated point
// in the "what we love" field becomes one borrowable practice (short lead line +
// one-line summary), and the first opportunity point becomes "the gap to close."
// This is a presentation layer over existing sheet data — no new fields needed.

function segments(text: string): string[] {
  return text
    .split(/\r?\n/)
    .flatMap((line) => line.split(/\s\|\s/))
    .map((s) => s.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
}

function leadAndSummary(seg: string): { lead: string; summary: string } {
  // Lead = text before the first ":" or " — " when that lands early, else the
  // first sentence. Summary = what follows, trimmed to one readable line.
  const colon = seg.indexOf(':');
  const dash = seg.indexOf(' — ');
  let cut = -1;
  if (colon > 12 && colon < 85) cut = colon;
  else if (dash > 12 && dash < 85) cut = dash;
  if (cut > 0) {
    const lead = seg.slice(0, cut).trim();
    const rest = seg.slice(cut + 1).replace(/^[\s—-]+/, '').trim();
    return { lead, summary: rest.length > 150 ? rest.slice(0, 147).trimEnd() + '…' : rest };
  }
  const period = seg.indexOf('. ');
  if (period > 20 && period < 110) {
    return { lead: seg.slice(0, period).trim(), summary: '' };
  }
  return { lead: seg.length > 85 ? seg.slice(0, 82).trimEnd() + '…' : seg, summary: '' };
}

export default function BorrowSidebar({
  fromName,
  loveText,
  gapText,
}: {
  fromName: string;
  loveText: string;
  gapText?: string;
}) {
  const borrows = segments(loveText).slice(0, 3).map(leadAndSummary);
  const gap = gapText ? leadAndSummary(segments(gapText)[0] || '') : null;
  if (!borrows.length && !gap) return null;
  return (
    <aside className="borrow">
      <h3>Things to borrow</h3>
      <p className="borrow-sub">Practices from {fromName} worth copying at your own parish.</p>
      {borrows.map((b, i) => (
        <div key={i} className="borrow-item">
          <div className="borrow-lead">{b.lead}</div>
          {b.summary && <p>{b.summary}</p>}
        </div>
      ))}
      {gap && gap.lead && (
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
    </aside>
  );
}
