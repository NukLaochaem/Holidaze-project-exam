import { Nav, Container, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Layout({ children }) {
  let activeStyle = {
    textDecoration: "underline 3px black solid",
    textUnderlineOffset: "3px",
  };

  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Link to="/" className="m-auto p-0 ms-lg-3">
            <img src="/image/logo.png" alt="Holidaze-Logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
              <NavLink
                to="/hotels"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Hotels
              </NavLink>
              <NavLink
                to="/contact"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Contact
              </NavLink>
              <NavLink
                to="/login"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="wrapper">{children}</div>

      <footer className="">
        <Container className="text-center">
          <div>
            <Link to="/">
              <img
                src="/image/logo.png"
                alt="Holidaze-Logo"
                className="footer-logo"
              />
            </Link>
          </div>
          <Link to="/">• Home</Link>
          <Link to="/hotels">• Hotels</Link>
          <Link to="/contact">• Contact</Link>
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
