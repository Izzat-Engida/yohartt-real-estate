// SvgMask — renders any single-color SVG as a CSS mask on a div, letting
// you drive the fill via `color` (any CSS color or var). Useful when an
// asset is too large/complex to want as inline JSX (e.g. wave dividers).
//
// The src should be a PNG with transparency OR an SVG. Mask uses the
// alpha channel, so SVG fill colors are ignored — the div's
// background-color becomes the visible color.

export function SvgMask({ src, color, className, style, ...rest }) {
    const merged = {
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        ...style,
    };
    return <div aria-hidden="true" className={className} style={merged} {...rest} />;
}
