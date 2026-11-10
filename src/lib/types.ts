export type UserTier = 'free' | 'starter' | 'team' | 'diocese_plus' | 'agency' | 'platform';

/** The 38 audit dimensions of the ParishVox template, keyed as in the workbook. */
export interface CathedralDimensions {
  welcome_posture: string;
  audience_balance: string;
  featured_vs_listed: string;
  ocia_path: string;
  sacraments_hub: string;
  faq_page: string;
  mass_times_findability: string;
  confession_adoration_visibility: string;
  giving_path: string;
  contact_findability: string;
  bulletin_freshness: string;
  bulletin_atomization: string;
  events_calendar: string;
  school_attached: string;
  gospel_rhythm: string;
  homilies_content: string;
  digital_faith_life: string;
  event_promotion: string;
  event_purpose_named: string;
  event_next_steps: string;
  event_identity: string;
  storytelling: string;
  photography: string;
  email_capture: string;
  copy_voice: string;
  vocations: string;
  platform_tier: string;
  pastor_visibility: string;
  livestream_status: string;
  multilingual: string;
  visual_identity: string;
  content_rhythm: string;
  priest_urgent_need: string;
  search_function: string;
  social_integration: string;
  content_freshness: string;
}

export interface Cathedral {
  id: string; // slug: name + city
  diocese: string;
  cathedralName: string;
  city: string;
  state: string;
  websiteUrl: string;
  thumbnail: string; // /thumbs/cathedrals/<slug>.jpg — rendered only when the file exists
  status: string;
  note: string;
  dimensions: CathedralDimensions;
  whatWeLove: string;
  areasOfOpportunity: string;
  audited: boolean; // true when dimension data is present
}

export interface PageTeardown {
  institutionName: string; // cathedral or parish name the page belongs to
  diocese: string;
  city: string;
  state: string;
  pageType: string;
  pageUrl: string;
  primaryMessage: string;
  ctaLabels: string;
  whatWeLove: string;
  areasOfOpportunity: string;
  invitationNote: string;
}

export interface Parish {
  id: string; // slug: name + city + state
  diocese: string;
  parishName: string;
  city: string;
  state: string;
  websiteUrl: string;
  thumbnail: string; // /thumbs/parishes/<slug>.jpg — rendered only when the file exists
  audited: boolean;
  faqScore: string; // Gloriam newcomer-questions score, e.g. "3/7"
  highlightAsset: string;
  highlightOpportunity: string;
}

export interface Diocese {
  id: string; // slug
  diocese: string;
  parishCount: string;
  withSite: string;
  coveragePct: string;
}

/** Dimension sections shown on a cathedral profile, in template order. */
export const DIMENSION_SECTIONS: { title: string; keys: (keyof CathedralDimensions)[] }[] = [
  {
    title: 'First Impression & Welcome',
    keys: ['welcome_posture', 'audience_balance', 'featured_vs_listed', 'visual_identity', 'photography'],
  },
  {
    title: 'Becoming Catholic & the Sacraments',
    keys: ['ocia_path', 'sacraments_hub', 'faq_page'],
  },
  {
    title: 'Mass, Prayer & the Church Year',
    keys: ['mass_times_findability', 'confession_adoration_visibility', 'livestream_status', 'gospel_rhythm', 'homilies_content'],
  },
  {
    title: 'Bulletins & Events',
    keys: ['bulletin_freshness', 'bulletin_atomization', 'events_calendar', 'event_promotion', 'event_purpose_named', 'event_next_steps', 'event_identity'],
  },
  {
    title: 'Giving, Contact & Care',
    keys: ['giving_path', 'contact_findability', 'priest_urgent_need', 'email_capture'],
  },
  {
    title: 'Story, Voice & Freshness',
    keys: ['storytelling', 'digital_faith_life', 'copy_voice', 'content_rhythm', 'content_freshness', 'multilingual'],
  },
  {
    title: 'People, Vocations & Community',
    keys: ['pastor_visibility', 'vocations', 'school_attached', 'social_integration'],
  },
  {
    title: 'Platform & Findability',
    keys: ['platform_tier', 'search_function'],
  },
];

export const DIMENSION_LABELS: Record<keyof CathedralDimensions, string> = {
  welcome_posture: 'Welcome posture',
  audience_balance: 'Audience balance',
  featured_vs_listed: 'Featured vs. listed',
  ocia_path: 'Becoming Catholic (OCIA) path',
  sacraments_hub: 'Sacraments hub',
  faq_page: 'Newcomer FAQ (Gloriam 0–7)',
  mass_times_findability: 'Mass times findability',
  confession_adoration_visibility: 'Confession & adoration visibility',
  giving_path: 'Giving path',
  contact_findability: 'Contact findability',
  bulletin_freshness: 'Bulletin freshness',
  bulletin_atomization: 'Bulletin atomization',
  events_calendar: 'Events calendar',
  school_attached: 'School attached',
  gospel_rhythm: 'Gospel rhythm',
  homilies_content: 'Homilies & teaching content',
  digital_faith_life: 'Digital faith life',
  event_promotion: 'Event promotion',
  event_purpose_named: 'Event purpose named',
  event_next_steps: 'Event next steps',
  event_identity: 'Event identity',
  storytelling: 'Storytelling',
  photography: 'Photography — faces, not facades',
  email_capture: 'Email capture',
  copy_voice: 'Copy voice',
  vocations: 'Vocations',
  platform_tier: 'Platform',
  pastor_visibility: 'Pastor / rector visibility',
  livestream_status: 'Livestream',
  multilingual: 'Multilingual content',
  visual_identity: 'Visual identity',
  content_rhythm: 'Content rhythm',
  priest_urgent_need: '"I need a priest" path',
  search_function: 'Site search',
  social_integration: 'Social integration',
  content_freshness: 'Content freshness',
};
