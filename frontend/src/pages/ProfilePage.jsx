import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading: profileUpdateLoading }] =
    useUpdateUserProfileMutation();
  const {
    data: orders,
    isLoading: ordersLoading,
    error,
  } = useGetMyOrdersQuery();
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        toast.error("Password didn't match!");
      } else {
        let resp = await updateUserProfile({ name, email, password }).unwrap();
        dispatch(setCredentials(resp.user));
        toast.success(resp.message);
      }
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  // Setting logged in user and email visible in the form
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        Welcome to you profile, {userInfo.name}!
      </h1>
      <Row
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        <Col md={4}>
          <h3
            style={{
              color: "#343a40",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Profile Info
          </h3>
          <Form
            onSubmit={updateProfileHandler}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form.Group controlId="name" className="my-3">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "6px", border: "1px solid #ced4da" }}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "6px", border: "1px solid #ced4da" }}
              />
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "6px", border: "1px solid #ced4da" }}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderRadius: "6px", border: "1px solid #ced4da" }}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="dark"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#343a40",
                border: "none",
              }}
            >
              Update
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h3
            style={{
              color: "#343a40",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            My Orders
          </h3>
          {ordersLoading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <Message variant="danger">{error.data.error}</Message>
          ) : (
            <Table
              responsive
              hover
              striped
              className="table-sm"
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Id
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Total
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Paid
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    Delivered
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #dee2e6",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      {order._id}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      ${order.totalPrice}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      {order.isPaid ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #dee2e6",
                      }}
                    >
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #dee2e6",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <Link to={`/order/${order._id}`}>
                        <Button
                          variant="light"
                          size="sm"
                          style={{
                            borderRadius: "6px",
                            border: "1px solid #ced4da",
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
