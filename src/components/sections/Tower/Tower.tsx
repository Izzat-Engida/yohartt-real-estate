import { FloorExplorer } from '../../FloorExplorer';


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
      <div className="tower-explorer__right">
        <FloorExplorer><TowerFacts /></FloorExplorer>
      </div>
    </section>
  );
}
