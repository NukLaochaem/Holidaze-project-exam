import { Nav, Container, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContex";

function Layout({ children }) {
  const [auth, setAuth] = useContext(AuthContext);

  let activeStyle = {
    textDecoration: "underline 3px black solid",
    textUnderlineOffset: "3px",
  };

  return (
    <>
      <Navbar expand="lg" className="py-3">
        <Container className="nav-container">
          <Link to="/" className="m-auto p-0">
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
                to="/accommodation"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Accommodation
              </NavLink>
              <NavLink
                to="/contact"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Contact
              </NavLink>

              {auth ? (
                <>
                  <NavLink
                    className="admin-nav"
                    to="/admin"
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                  >
                    Admin
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/login"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Login
                </NavLink>
              )}
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
          <Link to="/">Home</Link>
          <Link to="/accommodation">Accommodation</Link>
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
