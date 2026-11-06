// Renders audit cell text as readable structure instead of one long paragraph.
// Cells separate distinct points with " | " and line breaks; when there is more
// than one point, render them as a marker list, otherwise a plain paragraph.
export default function RichText({ text }: { text: string }) {
  const segments = text
    .split(/\r?\n/)
    .flatMap((line) => line.split(/\s\|\s/))
    .map((s) => s.trim())
    .filter(Boolean);
  if (segments.length <= 1) {
    return <p>{text}</p>;
  }
  return (
    <ul className="points">
      {segments.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  );
}
