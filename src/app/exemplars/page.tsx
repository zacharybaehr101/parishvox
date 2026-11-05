import Thumb from '../Thumb';
import { fetchAllCathedrals, fetchAllParishes } from '@/lib/sheets';

export const revalidate = 21600;

export default async function ExemplarsPage() {
  const [cathedrals, parishes] = await Promise.all([fetchAllCathedrals(), fetchAllParishes()]);
  const cathEx = cathedrals.filter((c) => c.audited && c.whatWeLove);
  const parishEx = parishes.filter((p) => p.highlightAsset);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>The Exemplar Playbook</h1>
          <p>
            Named parishes and cathedrals doing one thing exceptionally well — the patterns
            worth borrowing, in their own words and ours. No rankings: each exemplar is a
            proof of one practice, not a league table.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Cathedrals</h2>
        <div className="grid" style={{ marginBottom: '2rem' }}>
          {cathEx.map((c) => (
            <a key={c.id} href={`/cathedral/${c.id}`} className="card">
              <Thumb src={c.thumbnail} alt={`${c.cathedralName} homepage`} />
              <h3>{c.cathedralName}</h3>
              <div className="meta">{c.city}, {c.state} · {c.diocese}</div>
              <p>{c.whatWeLove}</p>
            </a>
          ))}
        </div>

        {parishEx.length > 0 && (
          <>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Parishes</h2>
            <div className="grid">
              {parishEx.map((p) => (
                <a key={p.id} href={`/parish/${p.id}`} className="card">
                  <Thumb src={p.thumbnail} alt={`${p.parishName} homepage`} />
                  <h3>{p.parishName}</h3>
                  <div className="meta">{p.city}, {p.state} · {p.diocese}</div>
                  <p>{p.highlightAsset}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
