import { Nav, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Link to="/" className="m-auto">
            Holidaze
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/">Home</Link>
              <Link to="/hotels">Hotels</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="wrapper">{children}</div>

      <footer className="">
        <Container className="text-center">
          <h4 className="py-3">Logo</h4>
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/contact">Contact</Link>
          <p className="footer-text mt-4">
            Holidaze is a local tourism agency in Bergen
          </p>
          <p className="footer-text">Norway, Bergen 5007</p>
          <p className="copyRight">@ Holidaze 2022 | All rights Reserved</p>
        </Container>
      </footer>
    </>
  );
}

export default Layout;
