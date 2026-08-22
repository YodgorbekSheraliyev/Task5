export interface TrailerSegment {
    type: string;
    text: string;
    animationStyle: string;
    clipId: string;
    colorFilter: string;
    zoom: number;
    speed: number;
    transitionToNext: string;
}

export interface TrailerSpec {
    segments: TrailerSegment[];
}

export interface TrailerSpec {
    segments: TrailerSegment[];
}