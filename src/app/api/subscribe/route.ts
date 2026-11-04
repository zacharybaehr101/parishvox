import { NextRequest, NextResponse } from 'next/server';

// Newsletter signup via Resend — same pattern as CampusVox.
// Required env: RESEND_API_KEY, RESEND_AUDIENCE_ID. Optional: SUBMISSION_EMAIL.
export async function POST(req: NextRequest) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error('Subscribe: Resend env vars not configured');
    return NextResponse.json(
      { error: 'Subscriptions are not configured yet. Please check back soon.' },
      { status: 503 },
    );
  }

  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  if (!res.ok) {
    console.error('Resend subscribe failed:', res.status, await res.text());
    return NextResponse.json({ error: 'Could not subscribe right now.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
