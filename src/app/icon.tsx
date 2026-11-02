import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';


export const size = {
  width: 70,
  height: 70,
};

export const contentType = 'image/png';

const logoBuffer = readFileSync(
  join(process.cwd(), 'public/media/home/yohalogo-nav.png')
);
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100%',
          backgroundColor: '#fdfbef',
          overflow: 'hidden',
        }}
      >
        <img
          src={logoBase64}
          alt="Logo"
          width={48}
          height={48}
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
