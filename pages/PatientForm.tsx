import Layout from "../components/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const mongodb = await getDatabase();
  const cookies = { cookie: getCookies({ req, res }) };

  const searchIdRdvButton = cookies.cookie.Slot;
  if (
    searchIdRdvButton === null ||
    searchIdRdvButton === undefined ||
    searchIdRdvButton === "undefined"
  ) {
    return {
      props: { data: null, idSlot: null },
    };
  } else {
    const AccessTokenPatient = cookies.cookie.AccessTokenPatient;
    const SplitSlot = searchIdRdvButton.split(",");
    const idSlot = SplitSlot[0];

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
    // const stringifyIdSlot = JSON.stringify(idSlot);
    return {
      props: {
        data: stringifyResult,
        idSlot: idSlot,
      },
    };
  }
};

export default function FormPatient({ data, idSlot }: any) {
  const result = JSON.parse(data);
  const router = useRouter();
  React.useEffect(() => {
    if (idSlot === null) {
      router.reload();
    }
  }, []);

  return (
    <Layout>
      <div className="form-group">
        <form method="POST" action="/api/mongodb/updatePatient">
          <h1>Who is the appointment for ? </h1>
          <input
            className="form-control"
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
          ></input>

          <input
            className="form-control"
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
          ></input>

          <input
            className="form-control"
            id="city"
            type="text"
            placeholder="City"
            name="city"
          ></input>
          <input
            className="form-control"
            id="speciality"
            type="text"
            placeholder="Phone"
            name="phone"
          ></input>
          <button className="btn btn-primary" type="submit" id="test2">
            <a> Confirm your details</a>
          </button>
        </form>
      </div>
    </Layout>
  );
}
