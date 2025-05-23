import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../slices/orderSlice";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  return (
    <>
      <h2
        className="mb-3"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
          fontSize: "30px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Orders
      </h2>
      {isLoading ? (
        <h1 style={{ textAlign: "center", color: "#666" }}>Loading...</h1>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || "An Error Occurred!"}
        </Message>
      ) : (
        <Table
          responsive
          striped
          hover
          className="table-sm"
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "14px",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
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
                User
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
              <tr
                key={order._id}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #dee2e6",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
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
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  {order.user.name}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  {order.createdAt.substring(0, 10)}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  ${order.totalPrice}
                </td>
                <td
                  style={{
                    padding: "12px",
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
                    padding: "12px",
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
                    textAlign: "center",
                  }}
                >
                  <Link to={`/order/${order._id}`}>
                    <Button
                      variant="light"
                      size="sm"
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "14px",
                        transition: "all 0.3s ease-in-out",
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
    </>
  );
};

export default OrdersPage;
