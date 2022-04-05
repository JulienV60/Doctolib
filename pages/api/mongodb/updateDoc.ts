import { getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || "POST") {
    const test = req.query;
    console.log(test);
    const cookies = { cookie: getCookies({ req, res }) };
    const AccessTokenDoc = cookies.cookie.AccessTokenDoc;

    const auth0searchUser = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        method: "Post",
        headers: {
          Authorization: `Bearer ${AccessTokenDoc}`,
        },
      }
    ).then((data) => data.json());
    const date = req.query.date;
    const time = req.query.time;
    const mailUserAuth0 = auth0searchUser.name;
    const mongodb = await getDatabase();
    const newDoctor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: mailUserAuth0,
      city: req.body.city,
      speciality: req.body.speciality,
      slots: {
        date: date,
        time: time,
        available: true,
      },
    };
    const addDoctor = await mongodb
      .db()
      .collection("Doctors")
      .insertOne(newDoctor);
    res.redirect("/DocAccount");
  } else {
    res.statusCode = 405;
    res.end();
  }
}
