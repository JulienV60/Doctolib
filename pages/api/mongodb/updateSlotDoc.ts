import { getCookies } from "cookies-next";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mongodb = await getDatabase();
  const cookies = { cookie: getCookies({ req, res }) };

  const date = req.query.date;
  const test = req.query.test;
  const test2 = test.toString();
  const newArray = JSON.parse(test2);

  const essai = newArray.map((e: any) => {
    {
      return { _id_slot: new ObjectId(), hours: e.label, available: true };
    }
  });

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

  if (searchIfAlreadyhere !== null) {
    const updateSlotDoc = await mongodb
      .db()
      .collection("Doctors")
      .updateOne(
        { email: mailUserAuth0 },
        {
          $push: {
            Slot: {
              _id_date: new ObjectId(),
              date: date,
              hours: essai,
            },
          },
        }
      );
    res.redirect(303, "/DocForm");
  } else {
    res.status(200).redirect(303, "/PleaseLoginDoc");
  }
}
