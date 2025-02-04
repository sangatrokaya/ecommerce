import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productSlice";
import Message from "../components/Message";

const HomePage = () => {
  /*   const [products, setProducts] = useState([]);
  useEffect(() => {
    const url = "/api/v1/products";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.log("Error occurred while fetching api!", err.message)
      );
  }, []); */

  // const products = useLoaderData();

  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

/* export const dataLoader = async() => {
  let resp = await fetch('/api/v1/products');
  let data = await resp.json();
  return data;
}
 */
export default HomePage;
