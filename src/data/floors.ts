/**
 * Yohartt Tower floors — edit zone names, descriptions and highlights here.
 *
 * Shapes are polygons traced on the 589×1080 rendering (src/assets/img/tower-render.jpg),
 * in that image's pixel coordinates. If the rendering changes, re-trace FLOOR_SHAPES.
 */

export const TOWER_VIEWBOX = { width: 589, height: 1080 } as const;
/** Right edge of the balcony facade, used to pin the floor label. */
export const FACADE_RIGHT_X = 300;

type Zone = { name: string; desc: string; chips: string[] };

const ZONES = {
  penthouse: {
    name: 'Penthouse level',
    desc: 'The crown of the tower — top-floor living with the widest views over Addis Ababa.',
    chips: ['Top-floor living', 'Panoramic views', 'Private balcony'],
  },
  sky: {
    name: 'Sky residences',
    desc: 'Upper-level homes with open city and mountain views from a full-width balcony.',
    chips: ['Upper-level views', 'Full-width balcony', 'Floor-to-ceiling glazing'],
  },
  residences: {
    name: 'Residences',
    desc: 'Light-filled apartments with floor-to-ceiling glazing and a private balcony.',
    chips: ['Private balcony', 'Floor-to-ceiling glazing', 'Lift access'],
  },
  podium: {
    name: 'Podium level',
    desc: 'A fully glazed level above the arrival court, set aside for lounge and amenity space.',
    chips: ['Full-glass frontage', 'Street-facing', 'Shared amenities'],
  },
  arrival: {
    name: 'Arrival & parking',
    desc: 'A covered, landscaped arrival court with secure parking beneath the tower.',
    chips: ['Covered parking', 'Landscaped entrance', 'Secure access'],
  },
} satisfies Record<string, Zone>;

const FLOOR_SHAPES: Record<string, string> = {
  '14': '104,181.1 300,59.0 300,135.5 104,245.3',
  '13': '104,245.3 300,135.5 300,196.9 104,296.6',
  '12': '104,296.6 300,196.9 300,256.3 104,348.1',
  '11': '104,348.1 300,256.3 300,315.6 104,399.6',
  '10': '104,399.6 300,315.6 300,372.9 104,448.0',
  '9': '104,448.0 300,372.9 300,432.3 104,498.4',
  '8': '104,498.4 300,432.3 300,492.7 104,548.7',
  '7': '104,548.7 300,492.7 300,554.0 104,602.2',
  '6': '104,602.2 300,554.0 300,612.2 104,657.0',
  '5': '104,657.0 300,612.2 300,679.9 104,706.8',
  '4': '104,706.8 300,679.9 300,736.0 104,759.6',
  '3': '104,759.6 300,736.0 300,796.1 104,818.5',
  '2': '104,818.5 300,796.1 300,861.6 104,871.7',
  '1': '104,871.7 300,861.6 300,918.0 104,918.0',
  G: '104,918.0 300,918.0 300,985.0 104,985.0',
};

function zoneFor(id: string): Zone {
  if (id === 'G') return ZONES.arrival;
  const n = Number(id);
  if (n === 14) return ZONES.penthouse;
  if (n >= 12) return ZONES.sky;
  if (n === 1) return ZONES.podium;
  return ZONES.residences;
}

export type Point = [number, number];

export type Floor = {
  id: string;
  /** Big number on the floor card: "09", or "G". */
  num: string;
  /** Short tag on the building: "L09" or "G". */
  short: string;
  /** "Level 09" or "Ground floor". */
  label: string;
  zone: Zone;
  points: Point[];
};

const ORDER = ['14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'G'];

export const FLOORS: Floor[] = ORDER.map((id) => {
  const ground = id === 'G';
  const padded = ground ? 'G' : id.padStart(2, '0');
  return {
    id,
    num: padded,
    short: ground ? 'G' : `L${padded}`,
    label: ground ? 'Ground floor' : `Level ${padded}`,
    zone: zoneFor(id),
    points: FLOOR_SHAPES[id].split(' ').map((p) => p.split(',').map(Number) as Point),
  };
});

export const DEFAULT_FLOOR = '9';

export function getFloor(id: string): Floor | undefined {
  return FLOORS.find((f) => f.id === id);
}
