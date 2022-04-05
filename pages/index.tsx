import type { NextPage } from "next";
import Layout from "../components/Layout";
import React from "react";

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      <Layout>
        <form className="form-inline" action="POST">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        <form className="form-inline" action="#"></form>
      </Layout>
    </div>
  );
};

export default Home;
