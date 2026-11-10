import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — ParishVox',
  description:
    'ParishVox is one person’s project: human judgment, a human-built audit framework, and AI used in its proper place — the reading at scale — so every parish gets a careful, encouraging look at its website.',
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="panel">
          <span className="badge">About</span>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>About ParishVox</h1>
          <p style={{ maxWidth: '65ch' }}>
            ParishVox audits Catholic parish and cathedral websites — what they publish, how they
            welcome newcomers, and what other parishes can borrow from them. Every profile is
            written to help the people who build these sites do it a little better: designers,
            content marketers, agencies, diocesan teams, and the parish volunteers carrying the
            work. The <Link href="/solutions">Solutions</Link> guides are free for everyone;{' '}
            <Link href="/pricing">membership</Link> opens the full profiles.
          </p>

          <h2 style={{ marginTop: '2rem' }}>A human project, with AI in its proper place</h2>
          <p style={{ maxWidth: '65ch' }}>
            ParishVox is one person&rsquo;s project, built for the people who run parish websites
            — most of them volunteers, many of them doing it alone, at night, after their day job.
            I know, because that&rsquo;s the world I work in: I&rsquo;m a school and parish
            communications director, and I built this because parishes deserve the same quality of
            content intelligence that big brands take for granted, at a scale no small team could
            otherwise afford — and I wanted to keep it honest as it grows.
          </p>
          <p style={{ maxWidth: '65ch' }}>
            Here&rsquo;s the honest division of labor. The judgment is human. I wrote the audit
            framework — what a welcoming homepage is, why a newcomer FAQ matters, what &ldquo;faces,
            not facades&rdquo; means — out of years of doing this work and studying what actually
            helps a stranger walk through a church door. I set the rules the audits follow: be
            encouraging, never scold; describe what a site has and what it could add; name no one,
            shame no one. I review samples line by line, correct the misses, and decide what gets
            published. Nothing goes live without a person reading it and standing behind it.
          </p>
          <p style={{ maxWidth: '65ch' }}>
            What the AI does is the reading at scale. There are seventeen thousand parishes in
            this country. No human can visit every homepage, every bulletin, every FAQ page — but
            with AI doing the legwork inside a human-built framework, one person can, and can keep
            it current. The AI is the research assistant: tireless, fast, and supervised. It is not
            the editor, the pastor, or the judge.
          </p>
          <p style={{ maxWidth: '65ch' }}>
            Used this way, AI isn&rsquo;t a shortcut around human care. It&rsquo;s how a small,
            human project can afford to be thorough — so that the volunteer in a town of nine
            hundred gets the same careful look at her parish&rsquo;s website as a cathedral does.
            The loop runs through a person. It always will.
          </p>

          <p style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link className="btn" href="/search">Browse the profiles</Link>
            <Link className="btn secondary" href="/faq-score">How the FAQ score works</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
