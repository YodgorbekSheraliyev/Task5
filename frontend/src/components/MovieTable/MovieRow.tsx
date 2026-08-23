import { useState } from "react";
import type { MovieSummary } from "../../models/MovieSummary";
import type { MovieDetails } from "../../models/MovieDetails";
import { getMovieDetails } from "../../api/movieApi";
import { TrailerPlayer } from "../TrailerPlayer/TrailerPlayer";
import { MovieDetailsContent } from "../MovieDetails/MovieDetailsPanel";

interface MovieRowProps {
    movie: MovieSummary;
    seed: string;
    locale: string;
    avgReviews: number;
}

export function MovieRow({
    movie,
    seed,
    locale,
    avgReviews,
}: MovieRowProps) {
    const [expanded, setExpanded] =
        useState(false);

    const [details, setDetails] =
        useState<MovieDetails | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    async function handleToggle() {
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

            const result =
                await getMovieDetails(
                    movie.index,
                    seed,
                    locale,
                    avgReviews
                );

                console.log("DETAILS", result);

            setDetails(result);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load movie details."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <tr
                onClick={handleToggle}
                style={{
                    cursor: "pointer",
                }}
            >
                <td>{movie.index}</td>

                <td>
                    <strong>
                        {movie.title}
                    </strong>
                </td>

                <td>
                    {movie.actors.join(", ")}
                </td>

                <td>{movie.year}</td>

                <td>{movie.genre}</td>

                <td>{movie.likes}</td>

                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleToggle();
                        }}
                    >
                        {expanded ? "▲" : "▼"}
                    </button>
                </td>
            </tr>

            {expanded && (
                <tr>
                    <td
                        colSpan={7}
                        className="bg-light"
                    >
                        <MovieDetailsContent
                            details={details}
                            loading={loading}
                            error={error}
                            title={movie.title}
                        />
                    </td>
                </tr>
            )}
        </>
    );
}