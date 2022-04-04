import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryCode = req.query.code;

  const auth0 = await fetch(`${process.env.AUTH0_TOKEN}`, {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: `grant_type=authorization_code&client_id=${process.env.AUTH0_CLIENT_ID}&client_secret=${process.env.AUTH0_CLIENT_SECRET}&code=${queryCode}&redirect_uri=http://localhost:3000/`,
  })
    .then((data) => data.json())
    .then((token) => token);
  const tokenAccess = auth0.access_token;
  const tokenId = auth0.id_token;
  res.setHeader("Set-Cookie", [
    cookie.serialize("AccessToken", tokenAccess, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("IdToken", tokenId, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
  ]);
  const patientsInfo = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    {
      method: "Post",
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
      },
    }
  ).then((data) => data.json());
  const patientMail = patientsInfo.name;
  const setDbPatient = {
    tokenAccessPatient: tokenAccess,
    firstName: "",
    lastName: "",

    email: patientMail,
  };
  const mongoDb = await getDatabase();
  const setDbPatientInfo = await mongoDb
    .db()
    .collection("Patients")
    .insertOne(setDbPatient);
  res.redirect("/");
}
