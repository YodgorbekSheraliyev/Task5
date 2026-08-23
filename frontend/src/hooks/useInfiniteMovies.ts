import { useCallback, useEffect, useRef, useState } from "react";

import { getMovies } from "../api/movieApi";
import type { MovieSummary } from "../models/MovieSummary";

interface UseInfiniteMoviesParams {
  seed: string;
  locale: string;
  pageSize: number;
  avgLikes: number;
  avgReviews: number;
}

export function useInfiniteMovies({
  seed,
  locale,
  pageSize,
  avgLikes,
  avgReviews,
}: UseInfiniteMoviesParams) {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const nextPageRef = useRef(1);
  const loadingRef = useRef(false);

  const loadNextPage = useCallback(async () => {
    if (!seed || !locale || loadingRef.current || !hasMore) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const page = nextPageRef.current;

      const result = await getMovies(
        seed,
        locale,
        page,
        pageSize,
        avgLikes,
        avgReviews,
      );

      setMovies((current) => (page === 1 ? result : [...current, ...result]));

      nextPageRef.current = page + 1;

      setHasMore(result.length === pageSize);
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [seed, locale, pageSize, avgLikes, avgReviews, hasMore]);

  useEffect(() => {
    setMovies([]);
    setHasMore(true);
    nextPageRef.current = 1;
    loadingRef.current = false;

    if (seed && locale) {
      void loadNextPage();
    }
  }, [seed, locale, pageSize, avgLikes, avgReviews]);

  return {
    movies,
    loading,
    hasMore,
    error: null,
    loadNextPage,
  };
}
