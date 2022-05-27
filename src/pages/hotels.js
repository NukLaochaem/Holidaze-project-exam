import Layout from "../components/layout/Layout";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../components/settings/api";
import axios from "axios";
import { useState, useEffect } from "react";

const hotelsUrl = baseUrl + "api/hotels?populate=*";

export default function Hotels() {
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
        <h1 className="hotels-banner-text">See all our hotels</h1>
      </div>

      <Container>
        <Row className="my-5 justify-content-around gap-5">
          {hotels.map((hotel) => {
            return (
              <Col
                md={5}
                lg={3}
                key={hotel.id}
                className="hotels-container p-0"
              >
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
                  <h3 className="hotels-price">
                    Nok {hotel.attributes.price} / Night
                  </h3>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}
