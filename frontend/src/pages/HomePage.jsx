import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const url = "/api/v1/products";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.log("Error occurred while fetching api!", err.message)
      );
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product.name}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
