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
    body: `grant_type=authorization_code&client_id=${process.env.AUTH0_CLIENT_ID}&client_secret=${process.env.AUTH0_CLIENT_SECRET}&code=${queryCode}&redirect_uri=${process.env.AUTH0_LOCAL}`,
  })
    .then((data) => data.json())
    .then((token) => token);
  const tokenAccessDoc = auth0.access_token;
  const tokenIdDoc = auth0.id_token;
  res.setHeader("Set-Cookie", [
    cookie.serialize("AccessTokenDoc", tokenAccessDoc, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("IdTokenDoc", tokenIdDoc, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }),
  ]);

  res.redirect("/DocForm");
}
