import Link from "next/link";

// Builds a page number list with gaps collapsed to an ellipsis, e.g.
// for page 5 of 20: [1, 'gap-4', 4, 5, 6, 'gap-19', 20]
// Always keeps the first page, last page, and one page on either side
// of the current one.
function getPageRange(current, total) {
  const delta = 1;
  const range = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  const withGaps = [];
  let prev;
  for (const i of range) {
    if (prev && i - prev > 1) withGaps.push(`gap-${i}`);
    withGaps.push(i);
    prev = i;
  }
  return withGaps;
}

// buildHref: (pageNumber) => string - same pattern as the admin Pagination
// component, so the caller controls the URL shape (query params, etc.)
export default function ThoughtsPagination({ page, totalPages, buildHref }) {
  if (totalPages <= 1) return null;

  const items = getPageRange(page, totalPages);

  return (
    <nav className="thoughts-pagination" aria-label="Pagination">
      {page > 1 ? (
        <Link
          href={buildHref(page - 1)}
          className="thoughts-pagination__arrow"
          aria-label="Previous page"
        >
          ‹
        </Link>
      ) : (
        <span
          className="thoughts-pagination__arrow thoughts-pagination__arrow--disabled"
          aria-hidden="true"
        >
          ‹
        </span>
      )}

      {items.map((item) =>
        typeof item === "number" ? (
          <Link
            key={item}
            href={buildHref(item)}
            className={`thoughts-pagination__num ${item === page ? "thoughts-pagination__num--active" : ""}`}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Link>
        ) : (
          <span key={item} className="thoughts-pagination__gap">
            …
          </span>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={buildHref(page + 1)}
          className="thoughts-pagination__arrow"
          aria-label="Next page"
        >
          ›
        </Link>
      ) : (
        <span
          className="thoughts-pagination__arrow thoughts-pagination__arrow--disabled"
          aria-hidden="true"
        >
          ›
        </span>
      )}
    </nav>
  );
}
