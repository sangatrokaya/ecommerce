import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 shadow rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link
            to={`/product/${product._id}`}
            className="text-decoration-none text-dark"
          >
            <Card.Text as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Text>
          </Link>
          <Card.Text as="div">
            <Rating value={product.rating} text={product.numReviews} />
          </Card.Text>
          <Card.Text as="h3">
            <strong>${product.price}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
