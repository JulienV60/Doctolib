import { getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || "POST") {
    const test = req.query;
    res.redirect("/");
  } else {
    res.statusCode = 405;
    res.end();
  }
}
