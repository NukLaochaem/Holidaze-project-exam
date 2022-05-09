import { Container, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import { baseUrl } from "../settings/api";
import axios from "axios";

const contactUrl = baseUrl + "api/contacts";

export default function GetContact() {
  const [contact, setContact] = useState([]);

  useEffect(function () {
    async function contactAdmin() {
      try {
        const response = await axios.get(contactUrl);
        setContact(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    contactAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="message-container bg-white p-5">
      <div className="message-admin">
        <h2>Messages</h2>
        <Accordion defaultActiveKey={["0"]}>
          {contact.map((contact) => {
            return (
              <Accordion.Item eventKey={contact.id} key={contact.id}>
                <Accordion.Header>
                  {contact.attributes.subject}
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <span className="me-2">From:</span>
                    {contact.attributes.email}
                  </p>
                  Message: {contact.attributes.message}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </Container>
  );
}
