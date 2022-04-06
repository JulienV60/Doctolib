import type { NextPage } from "next";
import Layout from "../components/Layout";
import React from "react";

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      <Layout>
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
          <button
            className="btn btn-outline-dark my-2 my-sm-0"
            type="submit"
            id="LogDoc"
          >
            <a>Search </a>
          </button>
        </form>
      </Layout>
    </div>
  );
};

export default Home;
