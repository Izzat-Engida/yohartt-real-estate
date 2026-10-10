import type { ReactNode } from 'react';
import type { Photo } from '@/data/projects';

/** A link to the full-size photo that <Lightbox> intercepts; works as a plain link without JS. */
export function LightboxLink({
  photo,
  className,
  children,
  reveal,
}: {
  photo: Photo;
  className?: string;
  children: ReactNode;
  reveal?: 'clip' | true;
}) {
  return (
    <a
      href={photo.src.src}
      className={className}
      data-lightbox=""
      data-width={photo.src.width}
      data-height={photo.src.height}
      data-caption={photo.caption}
      data-cursor="View"
      data-reveal={reveal === true ? '' : reveal}
    >
      {children}
    </a>
  );
}
