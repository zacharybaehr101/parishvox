import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Newcomer FAQ Score — ParishVox',
  description:
    'What the Newcomer FAQ score (Gloriam 0–7) on every ParishVox profile means: how many of the seven questions a first-time visitor actually asks the parish website answers clearly.',
};

const QUESTIONS = [
  ['Where are the bathrooms — and is there a changing table?', 'The most practical question a parent asks in the first five minutes, and the one almost no parish site answers.'],
  ['What should I wear?', 'A newcomer does not want to be the most overdressed — or underdressed — person in the room. One sentence removes the worry.'],
  ['Who do I ask for help when I get there?', 'A named doorway: an usher, a welcome desk, a greeter — someone a visitor can look for instead of guessing.'],
  ['How do I become Catholic?', 'The biggest question of all. The score looks for a visible, welcoming path in, not a program code buried in a menu.'],
  ['Is there a cry room? Are children welcome at Mass?', 'Young parents decide whether to come back based on whether the site treats their children as a gift or a problem.'],
  ["What if I don't know what I'm doing at Mass?", 'Permission to be new: when to stand and sit, whether to receive the blessing, what the responses are — said out loud, kindly.'],
  ['Can I receive Communion?', 'The question visitors most fear asking. A clear, gentle explanation of who receives, and what to do instead, is hospitality in writing.'],
];

export default function FaqScorePage() {
  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: QUESTIONS.map(([q, why]) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: why },
            })),
          }),
        }}
      />
      <div className="container">
        <div className="panel">
          <span className="badge">Reading a profile</span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>The Newcomer FAQ score, explained</h1>
          <p style={{ maxWidth: '65ch' }}>
            Every ParishVox profile carries a <b>Newcomer FAQ score</b> — a number like{' '}
            <b>0/7</b> or <b>3/7</b>. It counts how many of the <b>seven questions a first-time
            visitor actually asks</b> the parish website answers clearly, in a place a newcomer
            would think to look. That is all it measures — and it turns out to be one of the
            strongest signals of how a parish welcomes strangers online.
          </p>

          <h2 style={{ marginTop: '2rem' }}>The seven questions</h2>
          <div className="grid" style={{ marginTop: '0.75rem' }}>
            {QUESTIONS.map(([q, why], i) => (
              <div key={q} className="card">
                <h3 style={{ color: 'var(--navy)', marginTop: 0 }}>
                  {i + 1}. {q}
                </h3>
                <p style={{ fontSize: '0.9rem' }}>{why}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '2rem' }}>How to read the score</h2>
          <ul>
            <li><b>0–1 — The anxious questions go unanswered.</b> A visitor has to guess about everything on the list. This is the most common range in our audits.</li>
            <li><b>2–3 — The basics are covered.</b> Some real newcomer content exists, usually scattered; a dedicated page would pull it together.</li>
            <li><b>4–5 — Genuinely welcoming.</b> The parish has thought about what a first visit feels like and written it down.</li>
            <li><b>6–7 — A model worth borrowing.</b> Rare. These are the profiles other parishes study — several are linked from the fix guide below.</li>
          </ul>
          <p style={{ maxWidth: '65ch' }}>
            One point per question, earned only when the answer is plain and findable — on a FAQ
            page, an &ldquo;I&rsquo;m new&rdquo; page, or the homepage itself. An answer that
            exists only inside a bulletin PDF or a program description does not count, because a
            newcomer will never find it there.
          </p>

          <h2 style={{ marginTop: '2rem' }}>What the score is not</h2>
          <p style={{ maxWidth: '65ch' }}>
            It is <b>not a grade for the parish</b> — not its liturgy, its people, or its health.
            A parish can score 0/7 and be a wonderful place to worship; the score says only that
            its website leaves a nervous first-timer&rsquo;s questions unanswered. That is also
            why it is good news: of everything our audits measure, this is one of the fastest to
            fix — one honest page can move a score by five points.
          </p>

          <h2 style={{ marginTop: '2rem' }}>Where it comes from</h2>
          <p style={{ maxWidth: '65ch' }}>
            The rubric comes from Gloriam Marketing&rsquo;s research on parish websites, which
            calls the newcomer FAQ one of the most valuable pages a parish can publish. ParishVox
            adopted the seven-question score into its audit template, and every profile records
            the score as of its audit date.
          </p>

          <p style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link className="btn" href="/solutions/newcomer-faq">
              The fix: a newcomer FAQ that answers all seven →
            </Link>
            <Link className="btn secondary" href="/search">
              Browse profiles and their scores
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
