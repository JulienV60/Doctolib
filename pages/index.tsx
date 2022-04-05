import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import { Db } from "mongodb";
import { randomBytes } from "crypto";
export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const test = await mongodb.db().collection("Doctors").find().toArray();
  const martin = { firsname: "Martin", lastname: "V" };
  const newDoctor = await mongodb
    .db()
    .collection("Doctors")
    .updateOne(
      { firsname: "Martin" },
      {
        $set: {
          email: "julienkevin@gmail.com",
          access_token: "fesfdsfsdf",
          city: "",
          speciality: "",
          slots: {
            Lundi11: {
              slot1: {
                available: false,
                clientId: "",
              },
              slot2: {
                available: false,
                clientId: "",
              },
              slot3: {
                available: false,
                clientId: "",
              },
              slot4: {
                available: false,
                clientId: "",
              },
              slot5: {
                available: false,
                clientId: "",
              },
            },
            Mardi12: {
              slot1: {
                available: false,
                clientId: "",
              },
              slot2: {
                available: false,
                clientId: "",
              },
              slot3: {
                available: false,
                clientId: "",
              },
              slot4: {
                available: false,
                clientId: "",
              },
              slot5: {
                available: false,
                clientId: "",
              },
            },
            Mercredi13: {
              slot1: {
                available: false,
                clientId: "",
              },
              slot2: {
                available: false,
                clientId: "",
              },
              slot3: {
                available: false,
                clientId: "",
              },
              slot4: {
                available: false,
                clientId: "",
              },
              slot5: {
                available: false,
                clientId: "",
              },
            },
            Jeudi14: {
              slot1: {
                available: false,
                clientId: "",
              },
              slot2: {
                available: false,
                clientId: "",
              },
              slot3: {
                available: false,
                clientId: "",
              },
              slot4: {
                available: false,
                clientId: "",
              },
              slot5: {
                available: false,
                clientId: "",
              },
            },
            Vendredi15: {
              slot1: {
                available: false,
                clientId: "",
              },
              slot2: {
                available: false,
                clientId: "",
              },
              slot3: {
                available: false,
                clientId: "",
              },
              slot4: {
                available: false,
                clientId: "",
              },
              slot5: {
                available: false,
                clientId: "",
              },
            },
          },
        },
      }
    );

  console.log("newDoctor", newDoctor);

  // function addNewDoctor(db: Db) {
  //   db.collection("Doctors").updateOne(
  //     { _id: "2525" },
  //     { $set: { email: "JulienKevin@gamil.com" } }
  //   );
  // }
  // addNewDoctor();

  return {
    props: {
      data: JSON.stringify(test),
    },
  };
};
const Home: NextPage = ({ data }: any) => {
  const test = JSON.parse(data);
  console.log("line 18", test);
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
