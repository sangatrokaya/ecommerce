import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/techvaultlogo.png";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/signin");
  };
  console.log(cartItems);
  return (
    <>
      <header>
        <Navbar
          className="shadow"
          variant="dark"
          bg="dark"
          expand="md"
          collapseOnSelect
        >
          <Container>
            <NavLink to="/" className="navbar-brand">
              <img
                src={Logo}
                style={{ width: 50, height: 50 }}
                alt="Brand Logo"
              />
            </NavLink>
            <Navbar.Toggle aria-controls="Navbar" />
            <Navbar.Collapse id="Navbar" className="ms-auto">
              <Nav className="ms-auto">
                <NavLink to="/cart" className="nav-link">
                  <FaCartShopping />
                  Cart{" "}
                  {cartItems.length > 0 && (
                    <Badge bg="success" pill>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </NavLink>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="profile-dropdown">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavLink to="/signin" className="nav-link">
                    <FaUser />
                    Sign In
                  </NavLink>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
