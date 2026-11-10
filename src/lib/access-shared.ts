// Pure access rules shared by server and client code (no Clerk server
// imports here — the server getter lives in access.ts). Tier + scope live on
// the Clerk user's publicMetadata (set from the Clerk Dashboard; tiers are
// granted manually for founding members — no Stripe yet):
//   tier:         'free' | 'starter' | 'team' | 'diocese_plus' | 'agency' | 'platform'
//   scopeType:    'parish' | 'diocese'
//   scopeSlug:    profile slug for a parish-scoped (Starter) account
//   scopeDiocese: diocese name for a diocese-scoped (Team / Diocese Plus) account
// Anything missing or unrecognized falls back to tier 'free'.
// Per-user lists (favorites, to-dos, parish claim, audit requests) live in
// the user's unsafeMetadata and are managed client-side — see
// src/app/user-data.ts.

import type { UserTier } from './types';

export type { UserTier };

export const TIERS: UserTier[] = ['free', 'starter', 'team', 'diocese_plus', 'agency', 'platform'];

export interface AccessInfo {
  signedIn: boolean;
  tier: UserTier;
  scopeType?: string;
  scopeSlug?: string;
  scopeDiocese?: string;
}

export const ANON_ACCESS: AccessInfo = { signedIn: false, tier: 'free' };

export function normalizeTier(raw: unknown): UserTier {
  return typeof raw === 'string' && (TIERS as string[]).includes(raw)
    ? (raw as UserTier)
    : 'free';
}

/** Favorites ("Imitation list") cap per tier. */
export function favoritesCap(tier: UserTier): number {
  switch (tier) {
    case 'free': return 0;
    case 'starter': return 25;
    case 'team': return 200;
    case 'diocese_plus': return 500;
    case 'agency':
    case 'platform': return Number.POSITIVE_INFINITY;
  }
}

/** To-Do / Idea list is a paid feature (Starter and up). */
export function canUseTodo(tier: UserTier): boolean {
  return tier !== 'free';
}

/** Included on-demand audit requests per year, per tier. */
export function auditQuota(tier: UserTier): number {
  switch (tier) {
    case 'free': return 0;
    case 'starter': return 1;
    case 'team': return 4;
    case 'diocese_plus': return 12;
    case 'agency':
    case 'platform': return 12;
  }
}

export interface ProfileRef {
  kind: 'parish' | 'cathedral';
  slug: string;
  diocese: string;
}

/** Full (non-teaser) access to one profile, per the adopted scope rules. */
export function hasFullAccess(access: AccessInfo, profile: ProfileRef): boolean {
  if (!access.signedIn) return false;
  switch (access.tier) {
    case 'agency':
    case 'platform':
      return true;
    case 'starter':
      // One chosen parish — matched by profile slug (parish or its cathedral).
      return Boolean(access.scopeSlug) && access.scopeSlug === profile.slug;
    case 'team':
    case 'diocese_plus':
      // One chosen diocese — every profile whose diocese matches.
      return Boolean(access.scopeDiocese) && access.scopeDiocese === profile.diocese;
    default:
      return false;
  }
}
