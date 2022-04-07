import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
import cookie from "cookie";
import { getCookies } from "cookies-next";
import { getCookieParser } from "next/dist/server/api-utils";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || "POST") {
    const queryCode = req.query.code;

    const cookies = { cookie: getCookies({ req, res }) };
    const auth0 = await fetch(`${process.env.AUTH0_TOKEN}`, {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${process.env.AUTH0_CLIENT_ID}&client_secret=${process.env.AUTH0_CLIENT_SECRET}&code=${queryCode}&redirect_uri=${process.env.AUTH0_LOCAL}/`,
    })
      .then((data) => data.json())
      .then((token) => token);
    const tokenAccess = auth0.access_token;
    const tokenId = auth0.id_token;
    let response = await fetch(`http://localhost:3000/api/cookie`);
    response = await response.json().then((data) => data.cookie.Slot);
    const cookieSlot = res.setHeader("Set-Cookie", [
      cookie.serialize("AccessTokenPatient", tokenAccess, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("IdTokenPatient", tokenId, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      }),
    ]);
    const Slot = req.query.state;

    if (Slot == undefined || Slot == "undefined") {
      res.redirect("/");
    } else {
      res.redirect("/PatientForm");
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
