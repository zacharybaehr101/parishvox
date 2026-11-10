// Server-side access for the current request. Guarded so builds and local
// runs never crash when CLERK_SECRET_KEY is absent (only the publishable key
// is in .env.local): without the secret, everyone is treated as signed out.
// Pure rules live in access-shared.ts so client components can use them too.

import { ANON_ACCESS, normalizeTier, type AccessInfo } from './access-shared';

export * from './access-shared';
export type { AccessInfo };

export async function getServerAccess(): Promise<AccessInfo> {
  if (!process.env.CLERK_SECRET_KEY) return ANON_ACCESS;
  try {
    const { currentUser } = await import('@clerk/nextjs/server');
    const user = await currentUser();
    if (!user) return ANON_ACCESS;
    const md = (user.publicMetadata ?? {}) as Record<string, unknown>;
    return {
      signedIn: true,
      tier: normalizeTier(md.tier),
      scopeType: typeof md.scopeType === 'string' ? md.scopeType : undefined,
      scopeSlug: typeof md.scopeSlug === 'string' ? md.scopeSlug : undefined,
      scopeDiocese: typeof md.scopeDiocese === 'string' ? md.scopeDiocese : undefined,
    };
  } catch {
    return ANON_ACCESS;
  }
}
