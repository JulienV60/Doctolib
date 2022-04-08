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

    const findAppointmentObject = filterdbPatient?.Appointments.filter(
      (appointment: any) => {
        return appointment.id.toString() === id;
      }
    );
    console.log("appointmnt obj", findAppointmentObject);


    const findDoctorId = findAppointmentObject[0].idDoc;
    console.log("DocId", findDoctorId)

    const oneDoctor =  await mongodb
    .db()
    .collection("Doctors")
    .findOne({ _id: findDoctorId });

    console.log("myDoc", oneDoctor)

    const myDoctorsAppointments = oneDoctor?.Reserved.filter(
      (appointment: any) => {
        return appointment.id.toString() !== id;
      }
    );

    const newDoctor = {...oneDoctor, Reserved : myDoctorsAppointments}

    delete newDoctor._id;

    const removeAppointmentDoctor = mongodb
      .db()
      .collection("Doctors")
      .updateOne(
        {_id : findDoctorId},
        {$set : newDoctor}
      )



    const findAppointment = filterdbPatient?.Appointments.filter(
      (appointment: any) => {
        return appointment.id.toString() !== id;
      }
    );

    const newPatient = {
      ...filterdbPatient, Appointments : findAppointment,
    }
    delete newPatient._id;

    const removeAppointmentPatient = mongodb
      .db()
      .collection("Patients")
      .updateOne(
        { email: mailUserAuth0 },
        { $set : newPatient}
      );

    res.redirect("/PatientProfile");
  } else {
    res.statusCode = 405;
    res.end();
  }
}
