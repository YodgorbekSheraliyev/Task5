import { useEffect, useState } from "react";

import { getMovies } from "../api/movieApi";

import type { Movie } from "../models/Movie";

interface UseMoviesParams {
  seed: string;
  locale: string;
  page: number;
  pageSize: number;
  avgLikes: number;
  avgReviews: number;
}

export function useMovies({
  seed,
  locale,
  page,
  pageSize,
  avgLikes,
  avgReviews,
}: UseMoviesParams) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seed || !locale) {
      return;
    }

    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        const result = await getMovies(
          seed,
          locale,
          page,
          pageSize,
          avgLikes,
          avgReviews,
        );

        setMovies(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [seed, locale, page, pageSize, avgLikes, avgReviews]);

  return {
    movies,
    loading,
    error,
  };
}
