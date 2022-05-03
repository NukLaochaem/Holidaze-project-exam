import { Button } from "react-bootstrap";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid home-hero-container">
        <div className="home-text-wrapper">
          <h1 className="landing-text">Welcome to Bergen?</h1>

          <form className="search-form" action="">
            <input type="text" placeholder="Search.." name="search" />
            <button type="search">
              <i className="fa fa-search ms-2"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center gap-5">
          <div className="home-card-container col-12 col-md-5 text-center ">
            <div className="home-card1"></div>
            <div className="home-card-text m-3">
              <h3 className="">Ahead of the Pack</h3>
              <p>
                Book a room with ours hotels 5 days or more in advance and
                receive a 15% discount
              </p>
              <Link to="/hotels">
                <Button className="btn mb-2 btn-lg">Book Now</Button>
              </Link>
            </div>
          </div>

          <div className="home-card-container col-12 col-md-5">
            <div className="home-card2">
              <h3 className="card2-text">Experience Northern Light</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="tour my-5">
        <h2 className="tour-text">Fjordcruise Tour From Bergen</h2>
      </div>
    </Layout>
  );
}
