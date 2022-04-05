import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const queryCode = req.query.code;

  const auth0 = await fetch(`${process.env.AUTH0_TOKEN}`, {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: `grant_type=authorization_code&client_id=${process.env.AUTH0_CLIENT_ID}&client_secret=${process.env.AUTH0_CLIENT_SECRET}&code=${queryCode}&redirect_uri=http://localhost:3000/`,
  })
    .then((data) => data.json())
    .then((token) => token);
  const tokenAccessDoc = auth0.access_token;
  const tokenIdDoc = auth0.id_token;
  res.setHeader("Set-Cookie", [
    cookie.serialize("AccessToken", tokenAccessDoc, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("IdToken", tokenIdDoc, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
  ]);
  const docInfo = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    method: "Post",
    headers: {
      Authorization: `Bearer ${tokenAccessDoc}`,
    },
  }).then((data) => data.json());
  const docMail = docInfo.name;
  const setDbDoc = {
    firstName: "",
    lastName: "",
    email: docMail,
  };
  const mongoDb = await getDatabase();
  const setDbPatientInfo = await mongoDb
    .db()
    .collection("Doctors")
    .insertOne(setDbDoc);
  res.redirect("/formDoc");
}