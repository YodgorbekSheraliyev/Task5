import { useState } from "react";

import type { MovieSummary } from "../../models/MovieSummary";
import type { MovieDetails } from "../../models/MovieDetails";

import { getMovieDetails } from "../../api/movieApi";
import { MovieDetailsContent } from "../MovieDetails/MovieDetailsPanel";

interface MovieGalleryCardProps {
    movie: MovieSummary;
    seed: string;
    locale: string;
    avgReviews: number;
}

export function MovieGalleryCard({
    movie,
    seed,
    locale,
    avgReviews,
}: MovieGalleryCardProps) {
    const [expanded, setExpanded] = useState(false);

    const [details, setDetails] =
        useState<MovieDetails | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const handleToggle = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        setExpanded(true);

        if (details) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await getMovieDetails(
                movie.index,
                seed,
                locale,
                avgReviews,
            );

            setDetails(result);
        } catch (err) {
            console.error(err);

            setError(
                "Failed to load movie details.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="col">
            <div className="card h-100 shadow-sm">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title">
                            {movie.title}
                        </h5>

                        <span className="badge text-bg-secondary">
                            #{movie.index}
                        </span>
                    </div>

                    <p className="card-text">
                        <strong>Actors:</strong>{" "}
                        {movie.actors.join(", ")}
                    </p>

                    <p className="card-text">
                        <strong>Year:</strong>{" "}
                        {movie.year}
                    </p>

                    <p className="card-text">
                        <strong>Genre:</strong>{" "}
                        {movie.genre}
                    </p>

                    <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={handleToggle}
                    >
                        {expanded
                            ? "Hide details"
                            : "Show trailer, reviews & likes"}
                    </button>

                </div>

                {expanded && (
                    <div className="card-footer">
                        <MovieDetailsContent
                            details={details}
                            loading={loading}
                            error={error}
                            title={movie.title}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}