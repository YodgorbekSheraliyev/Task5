export interface TrailerSegment {
  type: string;
  text: string;
  animationStyle: string;
  clipId: string;
  colorFilter: string;
  zoom: number;
  speed: number;
  transitionToNext: string;
  duration: number;
}

export interface TrailerSpec {
  segments: TrailerSegment[];
}
