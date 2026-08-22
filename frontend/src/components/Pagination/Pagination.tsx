interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

export function Pagination({
  page,
  onPageChange,
  hasNextPage,
}: PaginationProps) {
  return (
    <nav aria-label="Movie pages">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>

        <li className="page-item active">
          <span className="page-link">{page}</span>
        </li>

        <li className={`page-item ${!hasNextPage ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
