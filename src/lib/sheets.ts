import { Cathedral, CathedralDimensions, PageTeardown, Parish, Diocese } from './types';
import sampleData from './sample-data.json';

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const TAB_CATHEDRALS = process.env.SHEET_TAB_CATHEDRALS ?? 'Cathedrals';
const TAB_PAGES = process.env.SHEET_TAB_PAGES ?? 'Pages';
const TAB_PARISHES = process.env.SHEET_TAB_PARISHES ?? 'Parishes';
const TAB_DIOCESES = process.env.SHEET_TAB_DIOCESES ?? 'Dioceses';

export const CACHE_REVALIDATE_SECONDS = 21600; // 6 hours, same as CampusVox

const sheetsConfigured = Boolean(SHEET_ID && API_KEY);

async function fetchSheet(tab: string, range: string): Promise<string[][]> {
  if (!sheetsConfigured) return [];
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`${tab}!${range}`)}?key=${API_KEY}`;
  try {
    const res = await fetch(url, { next: { revalidate: CACHE_REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.error(`Sheets [${tab}]: ${res.status} — ${await res.text()}`);
      return [];
    }
    return ((await res.json()).values ?? []) as string[][];
  } catch (err) {
    console.error(`Sheets exception [${tab}]:`, err);
    return [];
  }
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const DIMENSION_KEYS: (keyof CathedralDimensions)[] = [
  'welcome_posture', 'audience_balance', 'featured_vs_listed', 'ocia_path',
  'sacraments_hub', 'faq_page', 'mass_times_findability',
  'confession_adoration_visibility', 'giving_path', 'contact_findability',
  'bulletin_freshness', 'bulletin_atomization', 'events_calendar',
  'school_attached', 'gospel_rhythm', 'homilies_content', 'digital_faith_life',
  'event_promotion', 'event_purpose_named', 'event_next_steps', 'event_identity',
  'storytelling', 'photography', 'email_capture', 'copy_voice', 'vocations',
  'platform_tier', 'pastor_visibility', 'livestream_status', 'multilingual',
  'visual_identity', 'content_rhythm', 'priest_urgent_need', 'search_function',
  'social_integration', 'content_freshness',
];

function dimsFromCells(cells: string[]): CathedralDimensions {
  const dims = {} as CathedralDimensions;
  DIMENSION_KEYS.forEach((k, i) => {
    dims[k] = (cells[i] ?? '').trim();
  });
  return dims;
}

function rowToCathedral(row: string[]): Cathedral {
  const get = (i: number) => (row[i] ?? '').trim();
  const name = get(1);
  const city = get(2);
  const dims = dimsFromCells(row.slice(7, 43));
  // The workbook's last dimension column is stale_date_audit; the v2 template
  // renamed it content_freshness — same slot (index 35 of the dimension block).
  return {
    id: slugify(`${name} ${city}`),
    diocese: get(0),
    cathedralName: name,
    city,
    state: get(3),
    websiteUrl: get(4),
    status: get(5),
    note: get(6),
    dimensions: dims,
    whatWeLove: get(43),
    areasOfOpportunity: get(44),
    audited: DIMENSION_KEYS.some((k) => dims[k]),
  };
}

function sampleCathedrals(): Cathedral[] {
  return sampleData.cathedrals.map((c) =>
    rowToCathedral([
      c.diocese, c.name, c.city, c.state, c.website, c.status, c.note,
      ...c.dims, c.love, c.opp,
    ]),
  );
}

export async function fetchAllCathedrals(): Promise<Cathedral[]> {
  const rows = await fetchSheet(TAB_CATHEDRALS, 'A2:AS');
  if (rows.length) return rows.filter((r) => r[1]?.trim()).map(rowToCathedral);
  return sampleCathedrals();
}

export async function fetchCathedralBySlug(slug: string): Promise<Cathedral | null> {
  const all = await fetchAllCathedrals();
  return all.find((c) => c.id === slug) ?? null;
}

function rowToPage(row: string[]): PageTeardown {
  const get = (i: number) => (row[i] ?? '').trim();
  return {
    institutionName: get(0),
    diocese: get(1),
    city: get(2),
    state: get(3),
    pageType: get(4),
    pageUrl: get(5),
    primaryMessage: get(6),
    ctaLabels: get(7),
    whatWeLove: get(8),
    areasOfOpportunity: get(9),
    invitationNote: get(10),
  };
}

export async function fetchPagesForInstitution(name: string): Promise<PageTeardown[]> {
  const rows = await fetchSheet(TAB_PAGES, 'A2:K');
  const all = rows.length
    ? rows.filter((r) => r[0]?.trim()).map(rowToPage)
    : sampleData.pages.map((p) => rowToPage(p as string[]));
  return all.filter((p) => p.institutionName === name);
}

function rowToParish(row: string[]): Parish {
  const get = (i: number) => (row[i] ?? '').trim();
  const name = get(1);
  return {
    id: slugify(`${name} ${get(2)} ${get(3)}`),
    diocese: get(0),
    parishName: name,
    city: get(2),
    state: get(3),
    websiteUrl: get(4),
    audited: get(5).toLowerCase() === 'yes',
    faqScore: get(6),
    highlightAsset: get(7),
    highlightOpportunity: get(8),
  };
}

export async function fetchAllParishes(): Promise<Parish[]> {
  const rows = await fetchSheet(TAB_PARISHES, 'A2:I');
  if (!rows.length) return []; // no bundled parish sample — roster ships via the sheet
  return rows.filter((r) => r[1]?.trim()).map(rowToParish);
}

export async function fetchParishBySlug(slug: string): Promise<Parish | null> {
  const all = await fetchAllParishes();
  return all.find((p) => p.id === slug) ?? null;
}

function rowToDiocese(row: string[]): Diocese {
  const get = (i: number) => (row[i] ?? '').trim();
  return {
    id: slugify(get(0)),
    diocese: get(0),
    parishCount: get(1),
    withSite: get(2),
    coveragePct: get(3),
  };
}

export async function fetchAllDioceses(): Promise<Diocese[]> {
  const rows = await fetchSheet(TAB_DIOCESES, 'A2:D');
  if (rows.length) return rows.filter((r) => r[0]?.trim()).map(rowToDiocese);
  return sampleData.dioceses.map((d) =>
    rowToDiocese([d.diocese, d.count, d.withSite, d.pct]),
  );
}

export async function fetchFilterOptions() {
  const [cathedrals, parishes, dioceses] = await Promise.all([
    fetchAllCathedrals(),
    fetchAllParishes(),
    fetchAllDioceses(),
  ]);
  const states = [
    ...new Set([
      ...cathedrals.map((c) => c.state),
      ...parishes.map((p) => p.state),
    ].filter(Boolean)),
  ].sort();
  return {
    states,
    dioceses: dioceses.map((d) => d.diocese).sort(),
  };
}
