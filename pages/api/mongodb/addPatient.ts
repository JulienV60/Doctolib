import { getCookies } from "cookies-next";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || "POST") {
    const result = req.body;
    const cookies = { cookie: getCookies({ req, res }) };

    const AccessTokenPatient = cookies.cookie.AccessTokenPatient;
    console.log(cookies);

    console.log("AccessTokenPatient", AccessTokenPatient);
    const idButtonArray = Object.keys(result);
    const idButton = idButtonArray[0];
    // console.log(idButton);
    const mongodb = await getDatabase();
    const searchDb = await mongodb
      .db()
      .collection("Doctors")
      .findOne({ "Slot.id": new ObjectId(idButton) })
      .then((data) => data?.Slot);
    // console.log(searchDb);
    const Rdv = searchDb.filter((element: any) => {
      return element.id == idButton;
    });

    // const cookies = { cookie: getCookies({ req, res }) };
    // const AccessTokenPatient = cookies.cookie.AccessTokenPatient;

    // const auth0searchUser = await fetch(
    //   `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    //   {
    //     method: "Post",
    //     headers: {
    //       Authorization: `Bearer ${AccessTokenPatient}`,
    //     },
    //   }
    // ).then((data) => data.json());

    // const mailUserAuth0 = auth0searchUser.email;
    // const mongodb = await getDatabase();
    // const newPatient = {
    //   category: "Patient",
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   email: mailUserAuth0,
    // };
    // const searchIfAlreadyhere = await mongodb
    //   .db()
    //   .collection("Patients")
    //   .findOne({ email: mailUserAuth0 });

    // if (searchIfAlreadyhere === null) {
    //   const addPatient = await mongodb
    //     .db()
    //     .collection("Patients")
    //     .insertOne(newPatient);
    //   res.redirect("/PatientForm");
    // } else {
    //   res.statu
    if (AccessTokenPatient !== undefined && Rdv !== null) {
      res.redirect("/PatientForm");
    } else {
      res.status(200).redirect("/api/auth/login");
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
