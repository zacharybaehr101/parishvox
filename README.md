# ParishVox

Digital content analysis for Catholic parishes and cathedrals — the sister
publication of CampusVox, built on the same stack (Next.js 14 App Router,
Google Sheets as the data layer, Vercel hosting).

ParishVox audits parish and cathedral websites across 42 dimensions of
invitation: the newcomer doorway (including the Gloriam 0–7 FAQ score),
bulletin atomization, events as evangelization, giving paths, vocations,
and photography — *faces, not facades*. The audience is the professionals
who build those sites: designers, content marketers, agencies, and
diocesan communications teams. ParishVox publishes no rankings.

## Run it

```bash
npm install
npm run dev
```

Without sheet credentials the site runs on bundled sample data
(`src/lib/sample-data.json`: all 187 cathedrals at index level, 8 full
cathedral audits with their page teardowns, and the 176-diocese coverage
table), so a fresh clone renders a working preview immediately.

## Data layer — Google Sheets

Set `GOOGLE_SHEET_ID` and `GOOGLE_SHEETS_API_KEY` (see
`.env.local.example`). The sheet is read through the Sheets API v4 with a
6-hour cache, exactly like CampusVox. Four tabs, read from row 2:

| Tab | Range | Columns |
| --- | --- | --- |
| `Cathedrals` | A2:AS | Diocese, Cathedral, City, State, Website, Status, Note, then the 38 audit dimensions in template order, then What We Love, Areas of Opportunity |
| `Pages` | A2:K | Cathedral, Diocese, City, State, Page Type, Page URL, Primary Message, CTA Labels, What We Love, Areas of Opportunity, Invitation Note |
| `Parishes` | A2:I | Diocese, Parish, City, State, Website, Audited (yes/no), FAQ Score, Highlight Asset, Highlight Opportunity |
| `Dioceses` | A2:D | Diocese, Parish Count, With Site, Coverage % |

Tabs join to institutions by slug: cathedrals use `slugify(name + city)`,
parishes use `slugify(name + city + state)` (last row wins per slug).
The Cathedrals and Pages tabs mirror the ParishVox cathedral workbook
column-for-column, so the workbook exports straight into the sheet.

## Routes

- `/` — overview, search, headline counts, exemplar cards, newsletter signup
- `/search` — full search across cathedrals and parishes with state/diocese filters
- `/cathedrals` — every cathedral, grouped by state
- `/cathedral/[slug]` — the full 42-dimension audit plus key-page teardowns
- `/parish/[slug]` — parish profile (roster data, audit highlights when sampled)
- `/dioceses` — all 176 dioceses with parish website coverage
- `/exemplars` — the Exemplar Playbook: named sites doing one thing well
- `/pricing` — Free / Starter / Team / Agency, mirroring CampusVox
- `/api/subscribe` — newsletter signup via Resend

## Not yet built (same as CampusVox's roadmap)

Real auth (Clerk) and payments (Stripe) are stubbed in `.env.local.example`
only. Tier gating lands with them.
