import Layout from "../components/layout/Layout";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../components/settings/api";
import axios from "axios";
import { useState, useEffect } from "react";

const hotelsUrl = baseUrl + "api/hotels?populate=*";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(hotelsUrl);

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
        <div className="row my-5 ">
          {hotels.map((hotel) => {
            return (
              <div
                className="hotels-container p-0 col-md-6 col-lg-4"
                key={hotel.id}
              >
                <div className="hotel-img-container">
                  <Link to={`/detail/${hotel.id}`}>
                    {hotel.attributes.image.data.map(function (img) {
                      return (
                        <img
                          key={img.id}
                          src={img.attributes.formats.small.url}
                          alt={hotel.attributes.name}
                        />
                      );
                    })}
                  </Link>
                </div>

                <div className="hotels-card-container p-3">
                  <h2 className="hotles-name">{hotel.attributes.name}</h2>
                  <p className="hotels-location mt-3">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {hotel.attributes.location}
                  </p>
                  <h3 className="hotels-price">
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
