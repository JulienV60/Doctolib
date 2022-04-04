import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const test = await mongodb.db().collection("Doctors").find().toArray();
  return {
    props: {
      data: JSON.stringify(test),
    },
  };
};
const Home: NextPage = ({ data }: any) => {
  const test = JSON.parse(data);
  console.log(test);
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
