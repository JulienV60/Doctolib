import { getCookies } from "cookies-next";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "next/app";
import { getDatabase } from "../../../src/database";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || "POST") {
    const result = req.body;
    const resultdeux = req.query.index;

    const cookies = { cookie: getCookies({ req, res }) };
    const mongodb = await getDatabase();

    const AccessTokenPatient = cookies.cookie.AccessTokenPatient;
    const idButtonArray = Object.keys(result);
    const idButton = `${idButtonArray[0]},${resultdeux}`;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("Slot", idButton, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    if (AccessTokenPatient == undefined || null) {
      res.redirect("/PleaseLogin");
    } else {
      res.redirect("/PatientForm");
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
