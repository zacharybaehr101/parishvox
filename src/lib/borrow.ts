// "Things to borrow" extraction, shared by the profile Overview (in-flow
// section) and the teaser. Built from the audit's own highlight text: each
// numbered/pipe-separated point in the "what we love" field becomes one
// borrowable practice (short lead line + one-line summary), and the first
// opportunity point becomes "the gap to close." Presentation layer over
// existing sheet data — no new fields needed. (Moved out of BorrowSidebar,
// which rendered this as a sidebar; the 2026-11-10 spec puts it in the flow.)

export interface BorrowItem {
  lead: string;
  summary: string;
}

export function segments(text: string): string[] {
  return text
    .split(/\r?\n/)
    .flatMap((line) => line.split(/\s\|\s/))
    .map((s) => s.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
}

export function leadAndSummary(seg: string): BorrowItem {
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

export function borrowItems(loveText: string, gapText?: string): { borrows: BorrowItem[]; gap: BorrowItem | null } {
  const borrows = segments(loveText).slice(0, 3).map(leadAndSummary);
  const gap = gapText ? leadAndSummary(segments(gapText)[0] || '') : null;
  return { borrows, gap: gap && gap.lead ? gap : null };
}
