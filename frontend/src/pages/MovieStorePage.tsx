import { useEffect, useState } from "react";

import { getLocales, getRandomSeed } from "../api/movieApi";

import { Toolbar } from "../components/Toolbar/Toolbar";
import { MovieTable } from "../components/MovieTable/MovieTable";
import { Pagination } from "../components/Pagination/Pagination";

import { useMovies } from "../hooks/useMovies";

import type { GenerationSettings } from "../models/GenerationSettings";
import type { LocaleInfo } from "../models/LocaleInfo";

const PAGE_SIZE = 10;

export function MovieStorePage() {
  const [locales, setLocales] = useState<LocaleInfo[]>([]);

  const [settings, setSettings] = useState<GenerationSettings>({
    seed: "",
    locale: "",
    avgLikes: 0,
    avgReviews: 0,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function initialize() {
      try {
        const [availableLocales, randomSeed] = await Promise.all([
          getLocales(),
          getRandomSeed(),
        ]);

        setLocales(availableLocales);

        setSettings({
          seed: randomSeed,
          locale: availableLocales[0]?.code ?? "",
          avgLikes: 0,
          avgReviews: 0,
        });
      } catch (error) {
        console.error(error);
      }
    }

    initialize();
  }, []);

  const { movies, loading, error } = useMovies({
    seed: settings.seed,
    locale: settings.locale,
    page,
    pageSize: PAGE_SIZE,
    avgLikes: settings.avgLikes,
    avgReviews: settings.avgReviews,
  });

  const handleSeedChange = (seed: string) => {
    setPage(1);

    setSettings((current) => ({
      ...current,
      seed,
    }));
  };

  const handleRandomSeed = async () => {
    try {
      const newSeed = await getRandomSeed();

      setPage(1);

      setSettings((current) => ({
        ...current,
        seed: newSeed,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocaleChange = (locale: string) => {
    setPage(1);

    setSettings((current) => ({
      ...current,
      locale,
    }));
  };

  const handleAvgLikesChange = (value: number) => {
    setPage(1);

    setSettings((current) => ({
      ...current,
      avgLikes: value,
    }));
  };

  const handleAvgReviewsChange = (value: number) => {
    setPage(1);

    setSettings((current) => ({
      ...current,
      avgReviews: value,
    }));
  };

  const hasNextPage = movies.length === PAGE_SIZE;

  return (
    <div className="container-fluid">
      <Toolbar
        settings={settings}
        locales={locales}
        onSeedChange={handleSeedChange}
        onRandomSeed={handleRandomSeed}
        onLocaleChange={handleLocaleChange}
        onAvgLikesChange={handleAvgLikesChange}
        onAvgReviewsChange={handleAvgReviewsChange}
      />

      <main className="container-fluid py-4">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <MovieTable
              movies={movies}
              seed={settings.seed}
              locale={settings.locale}
              page={page}
              pageSize={PAGE_SIZE}
              avgReviews={settings.avgReviews}
            />

            <Pagination
              page={page}
              onPageChange={setPage}
              hasNextPage={hasNextPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
