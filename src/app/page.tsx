import Thumb from './Thumb';
import { fetchAllCathedrals, fetchAllDioceses, fetchAllParishes } from '@/lib/sheets';
import SubscribeForm from './SubscribeForm';

export const revalidate = 21600;

export default async function HomePage() {
  const [cathedrals, dioceses, parishes] = await Promise.all([
    fetchAllCathedrals(),
    fetchAllDioceses(),
    fetchAllParishes(),
  ]);

  const audited = cathedrals.filter((c) => c.audited);
  const exemplars = audited.filter((c) => c.whatWeLove).slice(0, 6);
  const totalParishes = dioceses.reduce((n, d) => n + (parseInt(d.parishCount, 10) || 0), 0);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            How parishes <span className="accent">invite</span> — measured.
          </h1>
          <p style={{ marginTop: '1rem' }}>
            ParishVox audits the websites of America&apos;s Catholic cathedrals and parishes across
            42 dimensions of invitation: the newcomer doorway, the bulletin, events, giving,
            vocations, and the photographs that say <em>faces, not facades</em>. Built for the
            designers, marketers, and agencies who build those sites.
          </p>
          <form action="/search" method="get" className="searchbar" style={{ marginTop: '1.5rem', maxWidth: '44rem' }}>
            <input name="q" type="search" placeholder="Search a parish, cathedral, city, or diocese…" aria-label="Search" />
            <button className="btn" type="submit">Search</button>
          </form>
          <div className="stat-row">
            <div className="stat"><b>{cathedrals.length}</b><span>Cathedrals audited</span></div>
            <div className="stat"><b>{totalParishes.toLocaleString()}+</b><span>Parishes tracked</span></div>
            <div className="stat"><b>{dioceses.length}</b><span>Dioceses covered</span></div>
            <div className="stat"><b>42</b><span>Audit dimensions</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Start with the cathedrals</h2>
            <p>
              Every U.S. cathedral, audited page by page — what its site has, whether that content
              works, and what it could add to level up. {audited.length} full audits are live,
              with parish audits from the national sample joining them
              {parishes.length ? ` (${parishes.length} loaded)` : ''}.
            </p>
          </div>
          <div className="grid">
            {exemplars.map((c) => (
              <a key={c.id} href={`/cathedral/${c.id}`} className="card">
                <Thumb src={c.thumbnail} alt={`${c.cathedralName} homepage`} />
                <span className="badge">Cathedral audit</span>
                <h3 style={{ marginTop: '0.5rem' }}>{c.cathedralName}</h3>
                <div className="meta">{c.city}, {c.state} · {c.diocese}</div>
                <p>{c.whatWeLove.slice(0, 220)}{c.whatWeLove.length > 220 ? '…' : ''}</p>
              </a>
            ))}
          </div>
          <p style={{ marginTop: '1.25rem' }}>
            <a className="btn secondary" href="/cathedrals">Browse all {cathedrals.length} cathedrals</a>
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <h2>What an audit covers</h2>
            <p>
              The ParishVox template reads a parish website the way a newcomer does — from the
              homepage outward — and scores the content, not the parish.
            </p>
          </div>
          <div className="grid">
            {[
              ['The newcomer doorway', 'A real FAQ page scored 0–7 on the questions a first-time visitor actually asks — bathrooms and changing tables, what to wear, who to ask for help, how to become Catholic, the cry room, what to do at Mass, and Communion eligibility.'],
              ['Bulletins, atomized', 'Whether the weekly bulletin stays a PDF or gets broken into living web content — events, registrations, and stories a search engine can find.'],
              ['Events as evangelization', 'Calendars that name a purpose, name a next step, and tell a newcomer they belong there — not just a room booking list.'],
              ['Faces, not facades', 'Real local photographs of Mass and parish life with visible people, over stock photos and empty buildings.'],
              ['Giving without friction', 'A giving path a visitor can find and finish, with the vendor and the story of what gifts do.'],
              ['Vocations, year-round', 'Local stories and a standing invitation — not a single ordination-week post.'],
            ].map(([title, body]) => (
              <div key={title} className="card">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="subscribe">
        <div className="container">
          <div className="section-head">
            <h2>The ParishVox newsletter</h2>
            <p>One exemplar, one pattern, and one gap worth pitching — in your inbox as new audits land.</p>
          </div>
          <SubscribeForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>For the people who build parish websites</h2>
            <p>
              ParishVox is a working library for agencies, freelancers, and diocesan teams:
              exemplar patterns to borrow, gaps to pitch, and benchmarks to plan a redesign around.
            </p>
          </div>
          <p>
            <a className="btn" href="/pricing">See plans</a>{' '}
            <a className="btn secondary" href="/exemplars">Browse exemplars</a>
          </p>
        </div>
      </section>
    </>
  );
}
