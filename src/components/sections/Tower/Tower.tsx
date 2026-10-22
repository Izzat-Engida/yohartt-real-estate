import Link from 'next/link';
import { FloorExplorer } from '../../FloorExplorer';
import { ArrowRight } from '../../icons';

export function TowerFacts() {
  return (
    <dl className="facts" data-reveal="">
      <div><dt><span data-count="14">14</span></dt><dd>Levels of homes</dd></div>
      <div><dt>G</dt><dd>Covered parking &amp; arrival</dd></div>
      <div><dt>Glass</dt><dd>Full-width glazing</dd></div>
      <div><dt>AA</dt><dd>Addis Ababa, Ethiopia</dd></div>
    </dl>
  );
}

export function TowerSection() {
  return (
    <section className="tower-explorer" id="tower" aria-labelledby="tower-title">
      <header className="tower-explorer__intro">
        <div className="tower-explorer__heading">
          <p className="tower-explorer__eyebrow">Residences / The building</p>
          <h2 id="tower-title" className="tower-explorer__title">The<br /><em>Tower</em></h2>
        </div>
        <div className="tower-explorer__copy">
          <p className="tower-explorer__lead">A home in the sky, shaped around light, air and the city beyond.</p>
          <p className="tower-explorer__desc">Explore the G+14 residential tower level by level. Select a floor to discover its character, from the covered arrival court to the panoramic homes above.</p>
          <Link href="/projects/yohartt-tower" className="tower-explorer__link">View the tower project <ArrowRight /></Link>
        </div>
      </header>

      <div className="tower-explorer__right">
        <FloorExplorer><TowerFacts /></FloorExplorer>
      </div>
    </section>
  );
}
