import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  if (req.method === "GET") {
    const url = `https://${process.env.AUTH0_DOMAIN}/authorize?client_id=${process.env.AUTH0_CLIENT_ID}&response_type=code&redirect_uri=${process.env.AUTH0_REDIRECT_URI_DOC}&audience=${process.env.AUTH0_AUDIENCE}&scope=${process.env.AUTH0_SCOPE}`;
    res.setHeader("Content-Type", "application/json");
    res.redirect(url);
  } else {
    res.statusCode = 405;
    res.end();
  }
}
