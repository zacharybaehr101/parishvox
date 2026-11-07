import type { PageTeardown } from '@/lib/types';

// Key-pages layout: full-width rows with a labeled left rail instead of a card
// grid — page type on the rail, the page's message up top, calls to action as
// chips, "what we love" and "opportunity" side by side, invitation note as a
// closing line. Same content as before, easier to scan.
export default function PageRows({ pages }: { pages: PageTeardown[] }) {
  return (
    <div className="page-rows">
      {pages.map((p, i) => (
        <div key={i} className="page-row">
          <div className="page-rail">
            <span>{p.pageType}</span>
          </div>
          <div className="page-body">
            {p.primaryMessage && (
              <p className="page-primary">{p.primaryMessage}</p>
            )}
            {p.ctaLabels && (
              <div className="cta-chips">
                {p.ctaLabels.split(/\s\|\s/).map((cta, j) => (
                  <span key={j} className="cta-chip">{cta}</span>
                ))}
              </div>
            )}
            {(p.whatWeLove || p.areasOfOpportunity) && (
              <div className="page-cols">
                {p.whatWeLove && (
                  <div>
                    <h5>What we love</h5>
                    <p>{p.whatWeLove}</p>
                  </div>
                )}
                {p.areasOfOpportunity && (
                  <div>
                    <h5>Opportunity</h5>
                    <p>{p.areasOfOpportunity}</p>
                  </div>
                )}
              </div>
            )}
            {p.invitationNote && <p className="page-note">{p.invitationNote}</p>}
            {p.pageUrl && (
              <a className="page-link" href={p.pageUrl} target="_blank" rel="noreferrer">
                Visit the page →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
