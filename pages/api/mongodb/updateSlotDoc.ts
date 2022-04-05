import { getCookies } from "cookies-next";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
import { v4 as uuidv4 } from "uuid";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.query);
    const date = req.query.date;
    const time = req.query.time;
    const mongodb = await getDatabase();
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

    const searchIfAlreadyhere = await mongodb
      .db()
      .collection("Doctors")
      .findOne({ email: mailUserAuth0 });
    const idunique = uuidv4();
    const updateSlotDoc = await mongodb
      .db()
      .collection("Doctors")
      .updateOne(
        { email: mailUserAuth0 },
        {
          $push: {
            Slot: {
              id: new ObjectId(),
              date: date,
              time: time,
            },
          },
        }
      );
  } else {
    res.statusCode = 405;
    res.end();
  }
}
