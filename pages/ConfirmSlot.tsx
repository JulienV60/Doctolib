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

  return {
    props: {
      data: stringifyResult,
      idSlot: idSlot,
    },
  };
};

export default function ConfirmSlot({ data, idSlot }: any) {
  const result = JSON.parse(data);

  const findAppointment = result[0].Appointments.filter((appointment: any) => {
    return appointment.id.toString() === idSlot;
  });

  return (
    <div>
      <Layout>
        <div className="ConfirmSlot">
          <h2>Summury of your appointment</h2>
          <h3>Check that all the details are correct</h3>
          <div className="SlotConfirmation">
            <h4>Your information</h4>
            <ul>
              First name : {result[0].firstName}
              <br></br>
              Last name : {result[0].lastName}
              <br></br>
              Phone number : {result[0].phone}
              <br></br>
              Email address : {result[0].email}
            </ul>
            <h4>Appointment information</h4>
            <ul>
              Doctor :{" "}
              {`${findAppointment[0].firstName} ${findAppointment[0].lastName}`}
              <br></br>
              Speciality : {findAppointment[0].speciality}
              <br></br>
              Address : {findAppointment[0].city}
              <br></br>
              Date : {findAppointment[0].date}
              <br></br>
              Time : {findAppointment[0].slot}
            </ul>
          </div>
          <form method="POST" action="/ConfirmAppointment">
            <button className="btn btn-primary" type="submit" id="test2">
              <a> Confirm your appointment</a>
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
