import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
const Home: NextPage = () => {
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

        <form className="form-inline" action="/api/auth/login"></form>
      </Layout>
    </div>
  );
};

export default Home;
