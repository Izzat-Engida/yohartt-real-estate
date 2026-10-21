import Image from 'next/image';
import { photos, type Photo } from '@/data/projects';
import { ProcessScroller } from '../../ProcessScroller';
import { LightboxLink } from '../../LightboxLink';

const STAGES: {
    photo: Photo; 
    title: string; 
    text: string }[] = [{ 
    photo: photos.structure, 
    title: 'The structure rises', 
    text: 'Columns and slabs go up floor by floor, wrapped in scaffolding and safety netting from day one.' }, 
    { photo: photos.rebar, 
    title: 'Every slab, engineered', 
    text: 'Reinforcement is laid and tied to the structural drawings, with conduits and services set in place before any concrete arrives.' }, 
    { photo: photos.pour, title: 'Poured with precision', 
    text: 'Ready-mix concrete is pumped, spread and vibrated across the slab by a dedicated crew for a solid, monolithic floor.' }, { 
    photo: photos.completed, 
    title: 'Finished & handed over', text: 'Clean facades, generous glazing and a secure gated entry — homes ready for families to move in.' }];
export function ProcessSection() {
     return (<ProcessScroller count={STAGES.length} labels={STAGES.map((stage) => stage.title)}>
        {STAGES.map((stage, i) => <article className="stage" key={stage.title}>
                <div className="stage__content"><p className="stage__eyebrow">Process</p>
                <div className="stage__body"><span className="stage__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{stage.title}</h3><p>{stage.text}</p></div></div><LightboxLink photo={stage.photo} className="stage__media">
                <Image src={stage.photo.src} alt={stage.photo.alt} sizes="(max-width: 899px) 0px, 300px" placeholder="blur" />
                </LightboxLink>
                </article>)}
                </ProcessScroller>);
         }
