import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import { getDatabase } from "../src/database";
import { getCookies } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const mongodb = await getDatabase();
  const cookies = { cookie: getCookies({ req, res }) };
  const AccessTokenPatient = cookies.cookie.AccessTokenPatient;
  const searchIdRdvButton = cookies.cookie.Slot;
  const SplitSlot = searchIdRdvButton.split(",");
  const idSlot = SplitSlot[0];
  console.log("testidslot1", idSlot);


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
      idSlot : idSlot,
    },
  };
};


export default function PatientProfile({ data, idSlot }: any) {
  const result = JSON.parse(data);

  const findAppointment = result[0].Appointments.filter(
    (appointment: any) => {
      return appointment.id.toString() === idSlot;
    }
  )

  return (
    <div>
      <Layout>
          <h3>My details</h3>
            <ul>
              First name : {result[0].firstName}<br></br>
              Last name : {result[0].lastName}<br></br>
              Phone number : {result[0].phone}<br></br>
              Email address : {result[0].email}
            </ul>
            <h4>Next appointments</h4>
            {result[0].Appointments.map(
              (appointment: any, index: any) => {
                return <div key={index}>
                  <ul>
                  Name : {`${appointment.category} ${appointment.firstName} ${appointment.lastName} `}<br></br>
                  Speciality : {appointment.speciality}<br></br>
                  Date : {appointment.date} <br></br>
                  Time : {appointment.slot} <br></br>
                  </ul>
                  </div>
              }
            )}

            <form method="POST" action="/">
            <button type="submit" id="test2">
            <a> Back to home page </a>
          </button>
            </form>
      </Layout>
    </div>
  );
}