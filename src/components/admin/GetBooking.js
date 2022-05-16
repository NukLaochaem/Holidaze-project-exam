import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { baseUrl } from "../settings/api";
import axios from "axios";

const contactUrl = baseUrl + "api/bookings";

export default function GetBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(function () {
    async function Booking() {
      try {
        const response = await axios.get(contactUrl);

        setBookings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    Booking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="booking-container bg-white p-3 p-md-5 my-5">
      <h2>Booking</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hotel name</th>
            <th>Check in </th>
            <th>Check out</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            return (
              <tr key={booking.id}>
                <td>{booking.attributes.name}</td>
                <td>{booking.attributes.hotel}</td>
                <td>{booking.attributes.checkin}</td>
                <td>{booking.attributes.checkout}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
