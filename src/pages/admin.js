import Layout from "../components/layout/Layout";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/AuthContex";

import GetContact from "../components/admin/GetContact";

export default function Admin() {
  const [, setAuth] = useContext(AuthContext);

  let navigate = useNavigate();

  //if (data.user) {navigate("/login");}      check for token

  function logout() {
    setAuth(null);
    navigate("/login");
  }

  return (
    <Layout>
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <h1>Admin page</h1>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>

        <Container className="booking-container bg-white p-5 my-5">
          <h2>Booking</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Hotel name</th>
                <th>Name / Email</th>
                <th>Check in </th>
                <th>Check out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Kim</td>
                <td>22/03/2022</td>
                <td>24/03/2022</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Karl</td>
                <td>15/05/2022</td>
                <td>16/05/2022</td>
              </tr>
              <tr>
                <td>Larry the Bird</td>
                <td>Ken</td>
                <td>17/05/2022</td>
                <td>20/05/2022</td>
              </tr>
            </tbody>
          </Table>
        </Container>

        <GetContact></GetContact>

        <Container className="add-container bg-white my-5 p-5">
          <Form className="">
            <h2>Add now hotels</h2>

            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Hotel name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label></Form.Label>
              <Form.Control type="text" placeholder="Location" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label></Form.Label>
              <Form.Control type="number" placeholder="Price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="details">
              <Form.Label></Form.Label>
              <Form.Control type="text" placeholder="Details" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label">Images files</Form.Label>
              <Form.Control
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      </Container>
    </Layout>
  );
}
