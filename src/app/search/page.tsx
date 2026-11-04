import { fetchAllCathedrals, fetchAllParishes, fetchFilterOptions } from '@/lib/sheets';

export const revalidate = 21600;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; state?: string; diocese?: string; kind?: string };
}) {
  const q = (searchParams.q ?? '').toLowerCase().trim();
  const state = searchParams.state ?? '';
  const diocese = searchParams.diocese ?? '';
  const kind = searchParams.kind ?? 'all';

  const [cathedrals, parishes, filters] = await Promise.all([
    fetchAllCathedrals(),
    fetchAllParishes(),
    fetchFilterOptions(),
  ]);

  const matches = (name: string, city: string, dio: string) =>
    !q ||
    name.toLowerCase().includes(q) ||
    city.toLowerCase().includes(q) ||
    dio.toLowerCase().includes(q);

  const cathResults = (kind === 'all' || kind === 'cathedral')
    ? cathedrals.filter(
        (c) =>
          matches(c.cathedralName, c.city, c.diocese) &&
          (!state || c.state === state) &&
          (!diocese || c.diocese === diocese),
      )
    : [];

  const parishResults = (kind === 'all' || kind === 'parish')
    ? parishes.filter(
        (p) =>
          matches(p.parishName, p.city, p.diocese) &&
          (!state || p.state === state) &&
          (!diocese || p.diocese === diocese),
      )
    : [];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>Search parishes &amp; cathedrals</h1>
          <p>Full-text search across every audited cathedral and sampled parish in the ParishVox database.</p>
        </div>

        <form action="/search" method="get" className="searchbar">
          <input name="q" type="search" defaultValue={searchParams.q ?? ''} placeholder="Name, city, or diocese…" aria-label="Search terms" />
          <select name="kind" defaultValue={kind} aria-label="Type">
            <option value="all">All types</option>
            <option value="cathedral">Cathedrals</option>
            <option value="parish">Parishes</option>
          </select>
          <select name="state" defaultValue={state} aria-label="State">
            <option value="">All states</option>
            {filters.states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select name="diocese" defaultValue={diocese} aria-label="Diocese">
            <option value="">All dioceses</option>
            {filters.dioceses.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button className="btn" type="submit">Search</button>
        </form>

        <p style={{ margin: '1rem 0', fontSize: '0.9rem' }}>
          {cathResults.length} cathedral{cathResults.length === 1 ? '' : 's'} · {parishResults.length} parish{parishResults.length === 1 ? '' : 'es'}
        </p>

        <div className="grid">
          {cathResults.map((c) => (
            <a key={c.id} href={`/cathedral/${c.id}`} className="card">
              <span className="badge">Cathedral</span>{' '}
              {c.audited && <span className="badge red">Full audit</span>}
              <h3 style={{ marginTop: '0.5rem' }}>{c.cathedralName}</h3>
              <div className="meta">{c.city}, {c.state} · {c.diocese}</div>
              {c.whatWeLove && <p>{c.whatWeLove.slice(0, 180)}{c.whatWeLove.length > 180 ? '…' : ''}</p>}
            </a>
          ))}
          {parishResults.map((p) => (
            <a key={p.id} href={`/parish/${p.id}`} className="card">
              <span className="badge">Parish</span>{' '}
              {p.audited && <span className="badge red">Audited</span>}
              <h3 style={{ marginTop: '0.5rem' }}>{p.parishName}</h3>
              <div className="meta">{p.city}, {p.state} · {p.diocese}</div>
              {p.highlightAsset && <p>{p.highlightAsset.slice(0, 180)}{p.highlightAsset.length > 180 ? '…' : ''}</p>}
            </a>
          ))}
        </div>

        {cathResults.length === 0 && parishResults.length === 0 && (
          <div className="note" style={{ marginTop: '1rem' }}>
            No matches yet. Parish profiles load from the ParishVox data sheet — if parish results
            are empty, the sheet connection is still being set up; cathedral audits are live.
          </div>
        )}
      </div>
    </section>
  );
}
