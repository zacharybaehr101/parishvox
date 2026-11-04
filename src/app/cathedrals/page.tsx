import { fetchAllCathedrals } from '@/lib/sheets';

export const revalidate = 21600;

export default async function CathedralsPage() {
  const cathedrals = await fetchAllCathedrals();
  const byState = new Map<string, typeof cathedrals>();
  for (const c of cathedrals) {
    const list = byState.get(c.state) ?? [];
    list.push(c);
    byState.set(c.state, list);
  }
  const states = [...byState.keys()].sort();

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>Cathedral audits</h1>
          <p>
            All {cathedrals.length} U.S. cathedrals in the ParishVox index, each audited across
            42 dimensions of invitation — what the site has, whether it works, and what it
            could add.
          </p>
        </div>
        {states.map((state) => (
          <div key={state} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{state}</h2>
            <div className="grid">
              {(byState.get(state) ?? []).map((c) => (
                <a key={c.id} href={`/cathedral/${c.id}`} className="card">
                  <h3>{c.cathedralName}</h3>
                  <div className="meta">{c.city} · {c.diocese}</div>
                  {c.audited ? (
                    <span className="badge red">Full audit</span>
                  ) : (
                    <span className="badge">In the index</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
