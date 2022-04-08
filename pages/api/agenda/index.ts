import type { NextApiRequest, NextApiResponse } from "next";
import { getCookies } from "cookies-next";
import { getDatabase } from "../../../src/database";
import Moment from "moment";
import moment from "moment";
import { start } from "repl";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = { cookie: getCookies({ req, res }) };
  const mongodb = await getDatabase();
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
  const filterdbDoctor = await mongodb
    .db()
    .collection("Doctors")
    .find({ email: mailUserAuth0 })
    .toArray();

  const findReserved = filterdbDoctor[0].Reserved.map((e: any, index: any) => {
    const test = moment(e.date).format("YYYY-MM-DD");
    return {
      id: index,
      title: e.name,
      start: `${e.date} ${
        e.slot.split("-")[0].split(":")[0]
      }:00:00 GMT+0200 (heure d’été d’Europe centrale)`,
      end: `${e.date} ${
        e.slot.split("-")[1].split(":")[0]
      }:00:00 GMT+0200 (heure d’été d’Europe centrale)`,
    };
  });
  res.end(JSON.stringify(findReserved));
}
