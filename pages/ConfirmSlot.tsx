import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import { getDatabase } from "../src/database";
import { getCookies } from "cookies-next";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const mongodb = await getDatabase();
  const cookies = { cookie: getCookies({ req, res }) };
  const AccessTokenPatient = cookies.cookie.AccessTokenPatient;

  const auth0searchUser = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    {
      method: "Post",
      headers: {
        Authorization: `Bearer ${AccessTokenPatient}`,
      },
    }
  ).then((data) => data.json());

  const mailUserAuth0 = auth0searchUser.email;
  const filterdbPatient = await mongodb
    .db()
    .collection("Patients")
    .find({ email: mailUserAuth0 })
    .toArray();

  const stringifyResult = JSON.stringify(filterdbPatient);
  return {
    props: {
      data: stringifyResult,
    },
  };
};
export default function confirmSlot({ data }: any) {
  const result = JSON.parse(data);

  return (
    <div>
      <Layout>
        {result.map((element: any, index: any) => {
          return (
            <div key={index}>
              <p key={index}>{element.category}</p>
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
