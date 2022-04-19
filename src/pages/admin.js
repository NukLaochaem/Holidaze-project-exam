import Layout from "../components/layout/Layout";
import { Container, Table, Accordion, Form, Button } from "react-bootstrap";

export default function Admin() {
  return (
    <Layout>
      <Container>
        <h1>Admin page</h1>

        <Container className="booking-container  bg-white p-5 my-5">
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
                <td>224/03/2022</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Karl</td>
                <td>15/05/22</td>
                <td>16/05/22</td>
              </tr>
              <tr>
                <td>Larry the Bird</td>
                <td>Ken</td>
                <td>17/05/22</td>
                <td>20/05/22</td>
              </tr>
            </tbody>
          </Table>
        </Container>

        <Container className="message-container bg-white p-5">
          <div className="message-admin">
            <h2>Messages</h2>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Subject</Accordion.Header>
                <Accordion.Body>
                  <p>
                    <span className="me-2">From</span>
                    Kjell
                  </p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  in culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Subject</Accordion.Header>
                <Accordion.Body>
                  <p>
                    <span className="me-2">From</span>
                    Kim
                  </p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>

        <Container className="add-container bg-white my-5 p-5">
          <Form className="">
            <h2>Add now hotels</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Container>
    </Layout>
  );
}
