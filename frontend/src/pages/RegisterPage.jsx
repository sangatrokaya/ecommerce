import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  Card,
  FormGroup,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useSignupMutation } from "../slices/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ----------- REDUX & ROUTING SETUP ---------------- */
  const dispatch = useDispatch(); // used to dispatch actions to Redux store
  const navigate = useNavigate(); // used to programmatically navigate between routes

  // Get user info from Redux store (if user is already logged in)
  const { userInfo } = useSelector((state) => state.auth);

  /* ------------ SIGNUP API HOOK (RTK QUERY) ------------- */

  /* 
    signup -> function to trigger signup API
    isLoading -> true while request is in progress
  */
  const [signUp, { isLoading }] = useSignupMutation();

  /* ------------ AUTO REDIRECT LOGIC ---------------- */

  /* 
      If user is already logged in,
      there is no point showing register page.
      Redirect to home page.
    */
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  /* ------------ FORM SUBMISSION HANDLER ----------- */
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent browser default form submission (page reload)

    try {
      /* 
      Send email and password to backend
      unwrap() gives actual response or throws error
      */
      const resp = await signUp({ name, email, password }).unwrap();

      /* 
        Save logged-in user info in Redux
        This effectively logs the user in
      */
      dispatch(setCredentials(resp.user));
      toast.success(resp.message);

      navigate("/"); // Redirect user to homepage
    } catch (err) {
      // handles possible errors like duplicate email, validation errors & server errors
      toast.error(err?.data?.error || "Registration failed!");
    }
  };

  /* --------- JSX (UI) ------------- */
  return (
    <FormContainer>
      <Card
        className="shadow p-4 rounded"
        style={{ margin: "auto", maxWidth: "400px" }}
      >
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <FormGroup controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </FormGroup>
            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
          <Row className="py-3 text-center">
            <Col>
              Already Registered?{" "}
              <Link to="/signin" className="text-decoration-none">
                Log In
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default RegisterPage;
