// Vendor credit registry — Agency + Platform ($549) perk.
// A verified host/designer gets one small, standardized credit in the
// Overview footer of every profile of a parish they host or designed:
//   role 'host'     → "Website by …"
//   role 'designer' → "Site design by …"
// Attribution only: the credit never sits inside analysis text, never near
// scores, and never affects findings. Empty by default — entries are added
// here (keyed by profile slug) as Platform members are verified.

export interface VendorCredit {
  name: string;
  url: string;
  logoUrl?: string;
  role: 'host' | 'designer';
}

export const VENDOR_CREDITS: Record<string, VendorCredit> = {
  // Example shape (not a real entry):
  // 'st-patricks-cathedral-new-york': {
  //   name: 'Example Catholic Web Co.',
  //   url: 'https://example.com',
  //   logoUrl: '/vendors/example.png',
  //   role: 'host',
  // },
};

export function vendorCreditFor(slug: string): VendorCredit | null {
  return VENDOR_CREDITS[slug] ?? null;
}
