import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

export default function Confirmed() {
  return (
    <Layout>
      <div className="container confirmed-container text-center">
        <i className="fa-solid fa-circle-check fa-3x"></i>
        <h1>Your booking has been confirmed.</h1>
        <p>Check your email for details</p>
        <Link to="/">
          <button className="btn-lg">Home</button>
        </Link>
      </div>
    </Layout>
  );
}
