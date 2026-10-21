// Maps the filename portion of a framerusercontent.com URL to the local
// mirror under /framer-assets/. Use this for ALL framer-sourced images
// so you control caching, can edit SVGs in place, and aren't tied to the
// CDN.
//
// Usage:
//   import { asset } from '@/lib/assets';
//   const HERO_PILL = asset('MbTFIMxj88EZnLKv8coGapnO8w.svg');
//
// Source-of-truth for what's mirrored:
//   _reference/framer-asset-manifest.json
//
// To re-mirror or add new assets, run mirror-assets.mjs.

export function asset(filename) {
    return `/framer-assets/${filename}`;
}
