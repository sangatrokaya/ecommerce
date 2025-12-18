import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

function Paginate({ page, pages, admin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          const pageNumber = x + 1;

          const link = admin
            ? `/admin/products/page/${pageNumber}`
            : keyword
            ? `/search/${keyword}/page/${pageNumber}`
            : `/page/${pageNumber}`;

          return (
            <Pagination.Item
              key={pageNumber}
              as={Link}
              to={link}
              active={pageNumber === page}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;

/* 

Garbage code 

(
          <Link
            key={x + 1}
            to={
              admin
                ? `/admin/products/page/${x + 1}`
                : keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
            }
            style={{ textDecoration: "none" }}
          >
            <Pagination.Item active={page === x + 1}>{x + 1}</Pagination.Item>
          </Link>
        )

*/
