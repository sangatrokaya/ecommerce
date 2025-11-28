import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

function Paginate({ page, pages, admin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
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
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
