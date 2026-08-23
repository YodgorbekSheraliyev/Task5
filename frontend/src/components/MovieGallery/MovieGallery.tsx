import { useEffect, useRef } from "react";

import type { MovieSummary } from "../../models/MovieSummary";
import { MovieGalleryCard } from "./MovieGalleryCard";

interface MovieGalleryProps {
    movies: MovieSummary[];
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;

    seed: string;
    locale: string;
    avgReviews: number;
}

export function MovieGallery({
    movies,
    loading,
    hasMore,
    onLoadMore,
    seed,
    locale,
    avgReviews,
}: MovieGalleryProps) {
    const loadMoreRef =
        useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = loadMoreRef.current;

        if (!element) {
            return;
        }

        const observer =
            new IntersectionObserver(
                (entries) => {
                    if (
                        entries[0]?.isIntersecting
                    ) {
                        onLoadMore();
                    }
                },
                {
                    rootMargin: "300px",
                },
            );

        observer.observe(element);

        return () => observer.disconnect();
    }, [onLoadMore]);

    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                {movies.map((movie) => (
                    <MovieGalleryCard
                        key={movie.index}
                        movie={movie}
                        seed={seed}
                        locale={locale}
                        avgReviews={avgReviews}
                    />
                ))}
            </div>

            <div
                ref={loadMoreRef}
                style={{ height: "1px" }}
            />

            {loading && (
                <div className="text-center py-4">
                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>
            )}

            {!hasMore &&
                movies.length > 0 && (
                    <div className="text-center text-muted py-4">
                        No more movies.
                    </div>
                )}
        </>
    );
}