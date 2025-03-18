import React from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import Message from "../../components/Message";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserListPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h3>Users</h3>
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
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button size="sm" variant="light">
                    <FaEdit />
                  </Button>
                  <Button size="sm" variant="danger" className="ms-2">
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

export default UserListPage;
