import { getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = req.body;
  const resultdeux = req.query.index;
  const cookies = { cookie: getCookies({ req, res }) };
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
    res.redirect(303, "/PleaseLogin");
  } else {
    res.redirect(303, "/PatientForm");
  }
}
