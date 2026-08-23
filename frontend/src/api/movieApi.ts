import type { LocaleInfo } from "../models/LocaleInfo";
import type { Movie } from "../models/Movie";
import type { MovieDetails } from "../models/MovieDetails";

const API_URL = import.meta.env.VITE_API_URL;

export async function getLocales(): Promise<LocaleInfo[]> {
  console.log("LOCALES", API_URL);

  const response = await fetch(`${API_URL}/locales`);
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to load locales");
  }

  return response.json();
}

export async function getRandomSeed(): Promise<string> {
  const response = await fetch(`${API_URL}/seed/random`);

  if (!response.ok) {
    throw new Error("Failed to generate random seed");
  }
  const seed = await response.json();

  return String(seed);
}

export async function getMovies(
  seed: string,
  locale: string,
  page: number,
  pageSize: number,
  avgLikes: number,
  avgReviews: number,
): Promise<Movie[]> {
  const params = new URLSearchParams({
    seed,
    locale,
    page: String(page),
    pageSize: String(pageSize),
    avgLikes: String(avgLikes),
    avgReviews: String(avgReviews),
  });

  const response = await fetch(`${API_URL}/movies?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load movies");
  }

  return response.json();
}

export async function getMovieDetails(
  index: number,
  seed: string,
  locale: string,
  avgReviews: number,
): Promise<MovieDetails> {
  const params = new URLSearchParams({
    seed,
    locale,
    avgReviews: avgReviews?.toString(),
  });

  const response = await fetch(`${API_URL}/movies/${index}/details?${params}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Ee" + errorText)
    throw new Error(
      `Failed to load movie details: ${response.status} ${errorText}`,
    );
  }

  return response.json();
}
