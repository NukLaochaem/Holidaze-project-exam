import Layout from "../components/layout/Layout";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../components/settings/api";
import axios from "axios";
import { useState, useEffect } from "react";

const hotelsUrl = baseUrl + "api/hotels/?publicationState=preview";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(function () {
    async function getData() {
      try {
        const response = await axios.get(hotelsUrl);
        console.log(response.data.data);
        setHotels(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid hotels-banner">
        <h1 className="hotels-banner-text">See all our hotels</h1>
      </div>

      <Container>
        {hotels.map((hotel) => {
          return (
            <div className="hotels-container my-5" key={hotel.id}>
              <div className="hotel-img-container">
                <Link to="/detail/:id">
                  <img src="" className="hotel-img" alt="hotel" />
                </Link>
              </div>

              <div className="hotels-card-container p-3">
                <h2 className="hotles-name">{hotel.attributes.name}</h2>
                <p className="hotels-location">{hotel.attributes.location}</p>
                <h4 className="hotels-description">Description</h4>
                <p className="hotels-info">{hotel.attributes.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="hotels-price text-right">
                    Nok {hotel.attributes.price} / Night
                  </h3>
                  <Link to="/detail/:id">
                    <button className="btn">Book Now</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Container>
    </Layout>
  );
}
