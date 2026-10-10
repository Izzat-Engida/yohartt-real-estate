import Link from 'next/link';
import { ArrowLeft } from '@/components/icons';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">
          <span>404</span> Page not found
        </p>
        <h1 className="display display--xl">
          This floor <em>isn’t built yet.</em>
        </h1>
        <Link href="/" className="btn btn--accent">
          <ArrowLeft />
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
