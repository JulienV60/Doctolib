import { getCookies } from "cookies-next";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || req.method === "GET") {
    const cookies = { cookie: getCookies({ req, res }) };
    const id = req.query.id;
    const idString = id.toString();
    const AccessTokenPatient = cookies.cookie.AccessTokenPatient;

    const mongodb = await getDatabase();
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
      .findOne({ email: mailUserAuth0 });

    const findAppointment = filterdbPatient?.Appointments.filter(
      (appointment: any) => {
        return appointment.id.toString() === id;
      }
    );
    console.log("testID", id);
    console.log("testappointment", findAppointment);

    const removeAppointmentPatient = mongodb
      .db()
      .collection("Patients")
      .deleteOne(
        { email: mailUserAuth0 }

        // { $unset: { Appointments: { id: { $elemMatch: { idString } } } } }
      );

    const removeAppointmentDoctor = await mongodb
      .db()
      .collection("Doctors")
      .updateOne(
        {},
        { $unset: { Reserved: { id: { $elemMatch: { idString } } } } }
      );

    res.redirect("/PatientProfile");
  } else {
    res.statusCode = 405;
    res.end();
  }
}
