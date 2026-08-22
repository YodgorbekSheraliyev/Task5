import type { Movie } from "../../models/Movie";

interface MovieTableProps {
    movies: Movie[];
}

export function MovieTable({ movies }: MovieTableProps) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Actors</th>
                        <th scope="col">Year</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Likes</th>
                    </tr>
                </thead>

                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.index}>
                            <td>{movie.index}</td>

                            <td>{movie.title}</td>

                            <td>
                                {movie.actors.join(", ")}
                            </td>

                            <td>{movie.year}</td>

                            <td>{movie.genre}</td>

                            <td>{movie.likes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}