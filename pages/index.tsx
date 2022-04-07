import type { NextPage } from "next";
import Layout from "../components/Layout";
import React from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Footer from "../components/footer";

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      <Layout>
        <br />
        <br />
        <br />
        <br />
        <h1>
          Réservez une consultation physique chez un professionnel de santé
        </h1>
        <Image src="/imagedefond.png" width={1500} height={200} />

        <br />
        <br />
        <br />
        <br />
        <form
          className="form-inline"
          method="GET"
          action="/PatientPath/path?speciality=&city="
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Speciality:"
            aria-label="Search"
            name="speciality"
          />
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="City:"
            aria-label="Search"
            name="city"
          />
          <Button
            variant="warning"
            className="btn btn-outline-dark my-2 my-sm-0"
            type="submit"
            id="LogDoc"
          >
            <a>Search </a>
          </Button>
        </form>
      </Layout>
      <Footer />
    </div>
  );
};

export default Home;
