import { Button } from "react-bootstrap";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid landing-wrapper">
        <h1 className="landing-text">Welcome to Bergen?</h1>
      </div>

      <div className="tour my-5">
        <h2 className="tour-text">Tour</h2>
      </div>

      <div class="container">
        <div class="row">
          <div class="home-card col-12 col-md-6 text-center">
            <p>SPACIOUS STAYS IN THE CITY</p>
            <Button>Book Now</Button>
          </div>
          <div class=" home-card col-12 col-md-6 text-center">
            <p>Experience Northern Light</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
