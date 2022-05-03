import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function Hotels() {
  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid hotels-banner">
        <h1 className="hotels-banner-text">See all our hotels</h1>
      </div>

      <Container className="">
        <div className="hotels-container my-5">
          <div className="hotel-img-container">
            <Link to="/detail/:id">
              <img src="" className="hotel-img" alt="hotel" />
            </Link>
          </div>

          <div className="hotels-card-container p-4">
            <h3 className="hotles-name">Hotels name</h3>
            <p className="hotels-location">Location 500m</p>
            <h4 className="rom-detail">Description</h4>
            <p className="hotels-info">
              Situated by the UNESCO World Heritage Site of Bryggen Wharf, 300
              metres from the fish market, is Radisson Blu Royal Hotel, Bergen.
              This modernised hotel offers air conditioned rooms with free
              Wi-Fi.
            </p>
            <h2 className="price text-right">Nok 1200 / Night</h2>
            <Link to="/detail/:id">
              <button className="btn btn-lg mt-2">Book Now</button>
            </Link>
          </div>
        </div>

        <div className="hotels-container my-5">
          <div className="hotel-img-container">
            <Link to="/detail/:id">
              <img src="" className="hotel-img" alt="hotel" />
            </Link>
          </div>

          <div className="hotels-card-container p-4">
            <h3 className="hotles-name">Hotels name</h3>
            <p className="hotels-location">Location 500m</p>
            <h4 className="rom-detail">Description</h4>
            <p className="hotels-info">
              Situated by the UNESCO World Heritage Site of Bryggen Wharf, 300
              metres from the fish market, is Radisson Blu Royal Hotel, Bergen.
              This modernised hotel offers air conditioned rooms with free
              Wi-Fi.
            </p>
            <h2 className="price text-right">Nok 1200 / Night</h2>
            <Link to="/detail/:id">
              <button className="btn btn-lg mt-2">Book Now</button>
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
