import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function Hotels() {
  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid hotels-banner">
        <h1 className="hotels-banner-text">See all our hotels</h1>
      </div>

      <div className="filter-container my-5">
        <h2 className="filter">Filter</h2>
      </div>

      <Container>
        <div className="hotels-container my-5">
          <Link to="/hotelDetails/:id">
            <div className="img-container">
              <image url=""></image>
            </div>
          </Link>
          <h3 className="hotles-name">Hotels name</h3>
          <p className="hotels-location">Location 500m</p>
          <h4 className="rom-detail">Rom Stand</h4>
          <p className="hotel-info">
            Situated by the UNESCO World Heritage Site of Bryggen Wharf, 300
            metres from the fish market, is Radisson Blu Royal Hotel, Bergen.
            This modernised hotel offers air conditioned rooms with free Wi-Fi.
          </p>
          <h2 className="price text-right">Nok 1200 / Night</h2>
          <Link to="/hotelDetails/:id">
            <button className="btn btn-primary">Book</button>
          </Link>
        </div>
      </Container>
    </Layout>
  );
}
