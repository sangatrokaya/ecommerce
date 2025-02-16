import { ListGroup, Row, Col, Card, Image } from "react-bootstrap";
import Messsage from "../components/Message";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderSlice";

function OrderPage() {
  let { id } = useParams();
  let { data, isLoading, error } = useGetOrderByIdQuery(id);
  console.log(data);

  return <h1>Order Details</h1>;
}

export default OrderPage;
