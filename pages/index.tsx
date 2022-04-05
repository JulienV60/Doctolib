import type { NextPage } from "next";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";

// export const getServerSideProps: GetServerSideProps = async () => {
//   const mongodb = await getDatabase();

//   const test = await mongodb.db().collection("Doctors").find().toArray();

// function addNewDoctor(db: Db) {
//   db.collection("Doctors").updateOne(
//     { _id: "2525" },
//     { $set: { email: "JulienKevin@gamil.com" } }
//   );
// }
// addNewDoctor();

//   return {
//     props: {
//       data:,
//     },
//   };
// };

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <div>
          <form method="POST" action="/api/mongodb/checkDoc">
            <input
              className=".form-control"
              id="speciality"
              type="text"
              placeholder="What speciality are you looking for ?"
              name="speciality"
            ></input>

            <input
              className=".form-control"
              id="city"
              type="text"
              placeholder="Where ?"
              name="city"
            ></input>

            <button type="submit" id="test2">
              <a>Search</a>
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
