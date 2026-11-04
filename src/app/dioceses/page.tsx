import { fetchAllDioceses } from '@/lib/sheets';

export const revalidate = 21600;

export default async function DiocesesPage() {
  const dioceses = await fetchAllDioceses();
  const sorted = [...dioceses].sort((a, b) => a.diocese.localeCompare(b.diocese));

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1 style={{ fontSize: '2rem' }}>Dioceses</h1>
          <p>
            All {sorted.length} Latin-rite dioceses in the ParishVox roster — parish counts and
            how many of their parishes have a verified website on file. Coverage grows as the
            fill pass verifies the remaining parishes.
          </p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Diocese</th>
              <th>Parishes</th>
              <th>With a website</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => (
              <tr key={d.id}>
                <td>
                  <a href={`/search?diocese=${encodeURIComponent(d.diocese)}`}>{d.diocese}</a>
                </td>
                <td>{d.parishCount}</td>
                <td>{d.withSite}</td>
                <td>{d.coveragePct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
