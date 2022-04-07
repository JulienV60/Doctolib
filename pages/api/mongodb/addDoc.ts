import { getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  const mailUserAuth0 = auth0searchUser.email;
  const mongodb = await getDatabase();
  const newDoctor = {
    category: "Doctor",
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: mailUserAuth0,
    city: req.body.city,
    speciality: req.body.speciality,
  };
  const searchIfAlreadyhere = await mongodb
    .db()
    .collection("Doctors")
    .findOne({ email: mailUserAuth0 });

  if (searchIfAlreadyhere === null) {
    const addDoctor = await mongodb
      .db()
      .collection("Doctors")
      .insertOne(newDoctor);
    res.redirect("/DocForm");
  } else {
    res.status(200).redirect("/api/auth/loginDoc");
  }
}
