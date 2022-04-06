import { getCookies } from "cookies-next";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
import { v4 as uuidv4 } from "uuid";
import { debugPort } from "process";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.query);
    const date = req.query.date;
    const time = req.query.time;
    const hours = req.query.hours;
    const hoursArray = hours.toString().split(",")

    const hoursSlots = Object.assign({}, hoursArray)
    console.log(hoursSlots);

    console.log("tests test2 ", hoursArray);

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
    if (searchIfAlreadyhere !== null) {
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
                hours : hoursSlots,
                available: true,
              },
            },
          }
        );
    } else {
      res.status(200).redirect("/api/auth/loginDoc");
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
function typeOf(morning: string | string[]): any {
  throw new Error("Function not implemented.");
}

