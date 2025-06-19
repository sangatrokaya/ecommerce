import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Message from "./Message";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <></>
  ) : error ? (
    <Message variant="danger">
      {error.data?.error || "Failed to load products"}
    </Message>
  ) : (
    <Carousel
      className="product-carousel"
      pause="hover"
      fade
      indicators
      controls
      interval={3000}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="d-block">
            <Image src={product.image} alt={product.name} fluid />
          </Link>
          <Carousel.Caption className="carousel-caption">
            <h3>{product.name}</h3>
            <span className="price">${product.price}</span>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
