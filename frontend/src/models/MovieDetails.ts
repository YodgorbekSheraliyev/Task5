import type { Review } from "./Review";
import type { TrailerSpec } from "./Trailer";

export interface MovieDetails {
    reviews: Review[];
    trailer: TrailerSpec;
}