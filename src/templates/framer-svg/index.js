// Single entry point for Framer-derived single-color SVGs.
//
// Two ways to use a single-color Framer SVG:
//
// 1. As an inline React component (preferred for icons / small shapes).
//    Color is inherited from CSS `color` on the parent — change it by
//    setting `color: var(--color-x)`.
//
//    import { SparkleIcon } from '@/components/framer-svg';
//    <SparkleIcon style={{ color: 'var(--color-gold)', width: 16, height: 16 }} />
//
// 2. As a CSS-mask via <SvgMask> (preferred for large decorative shapes
//    like wave dividers, where you want to drive shape + color independently).
//
//    import { SvgMask } from '@/components/framer-svg';
//    <SvgMask src="/framer-assets/tinted/<file>.svg"
//             color="var(--color-highlight)"
//             style={{ width: '100%', aspectRatio: '17.18' }} />
//
// The tinted/ folder contains SVGs whose `fill` attribute has been replaced
// with `currentColor`. Use those when loading via fetch/inline; the base
// folder retains the original colored SVGs for backwards-compatible <img> use.

export * from '{{ICONS_MODULE}}';
export { SvgMask } from './SvgMask';
