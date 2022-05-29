import Layout from "../components/layout/Layout";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../components/settings/api";
import axios from "axios";
import { useState, useEffect } from "react";

const hotelsUrl = baseUrl + "api/hotels?populate=*";

export default function Accommodation() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(hotelsUrl);

        setHotels(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="jumbotron jumbotron-fluid hotels-banner">
          <h1 className="hotels-banner-text text-center">
            See all our accommodation
          </h1>
        </div>
        <div className="text-center mt-5">
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid hotels-banner">
        <h1 className="hotels-banner-text text-center">
          See all our accommodation
        </h1>
      </div>

      <Container className="p-0">
        <div className="my-5 grid-container">
          {hotels.map((hotel) => {
            return (
              <div key={hotel.id} className="hotels-container">
                <div className="hotel-img-container">
                  <Link to={`/detail/${hotel.id}`}>
                    {hotel.attributes.image.data.map(function (img) {
                      return (
                        <img
                          src={img.attributes.formats.small.url}
                          alt={hotel.attributes.name}
                          key={hotel.id}
                        />
                      );
                    })}
                  </Link>
                </div>

                <div className="hotels-card-container p-3">
                  <Link to={`/detail/${hotel.id}`}>
                    <h2 className="hotles-name">{hotel.attributes.name}</h2>
                  </Link>

                  <p className="hotels-location mt-3">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {hotel.attributes.location}
                  </p>
                  <div className="d-flex">
                    <p className="me-4">
                      <i className="fa-solid fa-wifi me-1"></i>Wifi
                    </p>
                    <p className="me-4">
                      <i className="fa-solid fa-square-parking me-1"></i>Parking
                    </p>
                    <p>
                      <i className="fa-solid fa-bath me-1"></i>Bath
                    </p>
                  </div>
                  <h3 className="hotels-price ms-1">
                    Nok {hotel.attributes.price} / Night
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}
