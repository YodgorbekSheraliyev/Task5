import type { MovieDetails } from "../../models/MovieDetails";
import { TrailerPlayer } from "../TrailerPlayer/TrailerPlayer";

interface MovieDetailsPanelProps {
  details: MovieDetails | null;
  loading: boolean;
  error: string | null;
  title: string;
}

export function MovieDetailsContent({
  details,
  loading,
  error,
  title,
}: MovieDetailsPanelProps) {
  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }

  if (!details) {
    return null;
  }

  return (
    <div className="p-3">
      <div className="row g-4 d-flex flex-column">
        <div className="col-lg-8">
          <h5 className="mb-3">Trailer</h5>

          <TrailerPlayer title={title} trailer={details.trailer} />
        </div>

        <div className="col-lg-12">
          <h5 className="mb-3">Reviews</h5>

          {details.reviews.length === 0 ? (
            <div className="text-muted">No reviews.</div>
          ) : (
            <div className="d-flex flex-wrap g-1 flex-column">
              {details.reviews.map((review, index) => (
                <>
                  <div key={index} className=" bg-white p-1">
                    {review.text}
                  </div>
                  <br />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
