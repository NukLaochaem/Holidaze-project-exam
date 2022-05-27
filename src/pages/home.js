import { Button } from "react-bootstrap";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../components/settings/api";

const hotelsUrl = baseUrl + "api/hotels";

export default function Home() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(hotelsUrl);
        setAPIData(response.data.data);
      } catch (error) {}
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    const newFilter = APIData.filter((value) => {
      return value.attributes.name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredResults([]);
    } else {
      setFilteredResults(newFilter);
    }
  };

  return (
    <Layout>
      <div className="jumbotron jumbotron-fluid home-hero-container">
        <div className="home-text-wrapper">
          <h1 className="landing-text text-center">Welcome to Bergen?</h1>
        </div>

        <form className="search-form-container">
          <input
            type="text"
            placeholder="Search for hotels.."
            onChange={handleFilter}
          />

          {filteredResults.length !== 0 && (
            <div>
              {filteredResults.slice(0, 3).map((item) => {
                return (
                  <Link
                    className="search-item"
                    to={`/detail/${item.id}`}
                    key={item.id}
                  >
                    {item.attributes.name}
                  </Link>
                );
              })}
            </div>
          )}
        </form>
      </div>

      <div className="tour my-5">
        <h2 className="tour-text text-center">Fjordcruise Tour From Bergen</h2>
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
    </Layout>
  );
}
