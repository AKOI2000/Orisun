import Link from "next/link";

function Pagination({totalPages, page, status}) {
  return (
    <div>
      {totalPages > 1 && (
        <div className="admin-posts__pagination">
          {page > 1 ? (
            <Link href={`/admin?status=${status}&page=${page - 1}`}>
              ← Previous
            </Link>
          ) : (
            <span className="admin-posts__pagination-disabled">← Previous</span>
          )}

          <span>
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link href={`/admin?status=${status}&page=${page + 1}`}>
              Next →
            </Link>
          ) : (
            <span className="admin-posts__pagination-disabled">Next →</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
