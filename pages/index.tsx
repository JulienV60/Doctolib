import type { NextPage } from "next";
import Layout from "../components/Layout";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import Image from "next/image";
import Footer from "../components/footer";
import "../styles/Home.module.css";

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      <Layout />
      <Card>
        <Card.Img
          src="/imagedefond.png"
          width={500}
          height={500}
          alt="Card Image"
        />
        <Card.ImgOverlay>
          <br />
          <br />
          <br />
          <br />
          <h1>Book a physical consultation with a health care professional</h1>
          <br />
          <br />
          <br />
          <br />
          <Container>
            <Row>
              <form
                className="form-inline"
                method="GET"
                action="/PatientPath/path?speciality=&city="
              >
                <InputGroup>
                  <Col>
                    <FormControl
                      className="form-control mr-sm-2"
                      type="search"
                      placeholder="Speciality:"
                      aria-label="Search"
                      name="speciality"
                    />
                  </Col>
                  <Col>
                    <FormControl
                      className="form-control mr-sm-2"
                      type="search"
                      placeholder="City:"
                      aria-label="Search"
                      name="city"
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="warning"
                      className="btn btn-outline-dark my-2 my-sm-0"
                      type="submit"
                      id="LogDoc"
                    >
                      <a>Search </a>
                    </Button>
                  </Col>
                </InputGroup>
              </form>
            </Row>
          </Container>
        </Card.ImgOverlay>
      </Card>
      <Footer />
    </div>
  );
};

export default Home;
