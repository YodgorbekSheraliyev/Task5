import type { MovieSummary } from "../../models/MovieSummary";
import { MovieRow } from "./MovieRow";

interface MovieTableProps {
    movies: MovieSummary[];
    seed: string;
    locale: string;
    avgReviews: number;
}

export function MovieTable({
    movies,
    seed,
    locale,
    avgReviews,
}: MovieTableProps) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Actors</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Likes</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {movies.map((movie) => (
                        <MovieRow
                            key={movie.index}
                            movie={movie}
                            seed={seed}
                            locale={locale}
                            avgReviews={avgReviews}
                        />
                    ))}
                </tbody>

            </table>
        </div>
    );
}