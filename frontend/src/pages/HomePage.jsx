import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productSlice";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

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

  const { pageNumber, keyword } = useParams();

  // Convert pageNumber to number, default to 1 if not provided
  const currentPage = Number(pageNumber) || 1;

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber: currentPage,
    keyword,
  });
  console.log("Current Page:", currentPage, "keyword:", keyword);
  console.log("Query result:", { data, isLoading, error });

  console.log(
    "RTK Query - data:",
    data,
    "isLoading:",
    isLoading,
    "error:",
    error
  );
  return (
    <>
      {!keyword && <ProductCarousel />}
      {keyword ? (
        <h2>Search Results for {keyword}</h2>
      ) : (
        <h2>Latest Products</h2>
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

// export const dataLoader = async () => {
//   let resp = await fetch("/api/v1/products");
//   let data = await resp.json();
//   return data;
// };

export default HomePage;
