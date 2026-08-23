import { useState } from "react";
import { getMovieDetails } from "../api/movieApi";
import type { MovieDetails } from "../models/MovieDetails";

interface MovieDetailsParams {
  seed: string;
  locale: string;
  page: number;
  pageSize: number;
  avgReviews: number;
}

export function useMovieDetails({
  seed,
  locale,
  page,
  pageSize,
  avgReviews,
}: MovieDetailsParams) {
  const [details, setDetails] = useState<Record<number, MovieDetails>>({});

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const loadDetails = async (index: number) => {
    if (details[index]) {
      return;
    }

    try {
      setLoadingIndex(index);
      setError(null);

      const result = await getMovieDetails(index, seed, locale, avgReviews);

      setDetails((current) => ({
        ...current,
        [index]: result,
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to load movie details.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return {
    details,
    loadingIndex,
    error,
    loadDetails,
  };
}
