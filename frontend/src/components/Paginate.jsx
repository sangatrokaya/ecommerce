import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

function Paginate({ page, pages, admin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Link
            to={
              admin
                ? `/admin/products/page/${x + 1}`
                : `${keyword}/page/${x + 1}`
            }
            key={x + 1}
            style={{ textDecoration: "none" }}
          >
            <Pagination.Item active={page == x + 1}>{x + 1}</Pagination.Item>
          </Link>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
