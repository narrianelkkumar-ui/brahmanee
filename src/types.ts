export interface LispCommand {
  id: string;
  name: string;
  category: 'tippon' | 'labeling' | 'area' | 'tables' | 'dimensions';
  shortDescEn: string;
  shortDescTe: string;
  longDescEn: string;
  longDescTe: string;
  syntax: string;
  exampleUsage: string;
  keyFeatures: string[];
  iconName: string;
}

export interface TipponSegment {
  id: string;
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  rawInput: string; // e.g. "15-5" or "10.0"
  rupees: number;
  annas: number;
  meters: number;
  feet: number;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  directionKey: string; // '8', '2', '4', '6'
}

export interface ComparisonFeature {
  featureEn: string;
  featureTe: string;
  bhumithi: {
    status: 'poor' | 'average' | 'good';
    descriptionEn: string;
    descriptionTe: string;
  };
  seedCad: {
    status: 'good' | 'excellent';
    descriptionEn: string;
    descriptionTe: string;
  };
}

export interface YouTubeVideo {
  id: string;
  titleEn: string;
  titleTe: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}
