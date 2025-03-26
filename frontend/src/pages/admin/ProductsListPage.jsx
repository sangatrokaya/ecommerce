import React from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";
import { Row, Col, Button, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductsListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [addProduct, { isLoading: productLoading }] = useAddProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  // Function to handle the creation of new product by admin
  const addProductHandler = async () => {
    try {
      let resp = await addProduct().unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      let resp = await deleteProduct(id).unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-end">
          <Button size="sm" variant="dark" onClick={addProductHandler}>
            <FaEdit className="mb-1" /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <Table responsive hover striped className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Count In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    as={Link}
                    size="sm"
                    variant="light"
                    to={`/admin/product/${product._id}/edit`}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="ms-2"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsListPage;
