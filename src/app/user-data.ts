'use client';

// Per-user data stored in Clerk unsafeMetadata (client-writable):
//   favorites:     FavoriteEntry[]  — the "Imitation list" (☆)
//   todos:         TodoItem[]       — the To-Do / Idea list (💡)
//   claimedParish: string           — slug of the one parish a free user claims
//   auditRequests: AuditRequest[]   — on-demand audit requests
// unsafeMetadata is capped by Clerk at ~8KB total, fine for launch volumes.

import { useUser } from '@clerk/nextjs';
import { normalizeTier, type UserTier } from '@/lib/access-shared';

export interface FavoriteEntry {
  slug: string;
  kind: 'parish' | 'cathedral';
  name: string;
}

export interface TodoItem {
  id: string;
  text: string;
  sourceSlug: string;
  sourceName: string;
  sourceKind?: 'parish' | 'cathedral';
  done: boolean;
  note?: string;
}

export interface AuditRequest {
  id: string;
  slug: string;
  name: string;
  url: string;
  changed: string;
  focus: string;
  contact: string;
  date: string; // ISO date
}

function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

export function useUserData() {
  const { isLoaded, isSignedIn, user } = useUser();
  const md = (user?.unsafeMetadata ?? {}) as Record<string, unknown>;
  const favorites = arr<FavoriteEntry>(md.favorites);
  const todos = arr<TodoItem>(md.todos);
  const auditRequests = arr<AuditRequest>(md.auditRequests);
  const claimedParish = typeof md.claimedParish === 'string' ? md.claimedParish : '';
  const claimedParishName = typeof md.claimedParishName === 'string' ? md.claimedParishName : '';
  const tier: UserTier = normalizeTier(
    (user?.publicMetadata as Record<string, unknown> | undefined)?.tier,
  );

  async function save(patch: Record<string, unknown>) {
    if (!user) return;
    await user.update({
      unsafeMetadata: { ...(user.unsafeMetadata as Record<string, unknown>), ...patch },
    });
  }

  return {
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    user,
    tier,
    favorites,
    todos,
    auditRequests,
    claimedParish,
    claimedParishName,
    saveFavorites: (next: FavoriteEntry[]) => save({ favorites: next }),
    saveTodos: (next: TodoItem[]) => save({ todos: next }),
    saveAuditRequests: (next: AuditRequest[]) => save({ auditRequests: next }),
    claimParish: (slug: string, name: string) =>
      save({ claimedParish: slug, claimedParishName: name }),
  };
}

/** Audit requests used in the trailing 12 months (quota window). */
export function recentAuditRequests(requests: AuditRequest[]): AuditRequest[] {
  const cutoff = Date.now() - 365 * 24 * 60 * 60 * 1000;
  return requests.filter((r) => {
    const t = Date.parse(r.date);
    return Number.isNaN(t) || t >= cutoff;
  });
}
