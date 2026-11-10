'use client';

import { useState } from 'react';

/** Homepage thumbnail. Files live in /public/thumbs/... — when a slug has no
 *  capture yet the <img> errors and the component renders nothing, so cards
 *  and profiles simply stay text-only until the capture lands. */
export default function Thumb({ src, alt, wide = false, small = false }: { src: string; alt: string; wide?: boolean; small?: boolean }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={small ? 'thumb small' : wide ? 'thumb wide' : 'thumb'}
    />
  );
}
