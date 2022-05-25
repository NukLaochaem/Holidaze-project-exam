import Layout from "../components/layout/Layout";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/AuthContex";
import GetContact from "../components/admin/GetContact";
import GetBooking from "../components/admin/GetBooking";
import GetAddHotel from "../components/admin/GetAddHotel";

export default function Admin() {
  const [auth, setAuth] = useContext(AuthContext);
  let navigate = useNavigate();

  if (!auth) {
    navigate("/login");
  }

  function logout() {
    setAuth(null);
    navigate("/login");
  }

  return (
    <Layout>
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="my-3">Admin page</h1>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
        <GetBooking></GetBooking>
        <GetContact></GetContact>
        <GetAddHotel></GetAddHotel>
      </Container>
    </Layout>
  );
}
