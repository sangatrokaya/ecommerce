import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Card, FormGroup, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await login({ email, password }).unwrap();
      dispatch(setCredentials(resp.user));
      toast.success(resp.message);
    } catch (err) {
      // console.log(err);
      toast.error(
        err?.data?.error || err?.error || "Invalid Email or Password!"
      );
    }
  };

  return (
    <FormContainer>
      <Card
        className="shadow p-4 rounded"
        style={{ margin: "auto", maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button type="submit" variant="primary" className="w-100 mt-2">
              Sign In
            </Button>
          </Form>
          <Row className="py-3 text-center">
            <Col>
              New Customer?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginPage;
