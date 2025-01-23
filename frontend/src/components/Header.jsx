import { Navbar, Container, Nav } from "react-bootstrap";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import Logo from "../assets/techvaultlogo.png";

const Header = () => {
  return (
    <header>
      <Navbar variant="dark" bg="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            {" "}
            <img
              src={Logo}
              style={{ width: 40, height: 40 }}
              alt="Brand Logo"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="Navbar" />
          <Navbar.Collapse id="Navbar" className="ms-auto">
            <Nav className="ms-auto">
              <Nav.Link>
                <FaCartShopping />
                Cart
              </Nav.Link>
              <Nav.Link>
                <FaUser />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
