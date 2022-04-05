import { getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = req.body;
    const mongodb = await getDatabase();

    // const searchIfAlreadyhere = await mongodb
    //   .db()
    //   .collection("Doctors")
    //   .find({ speciality: req.body.speciality })
    //   .toArray();

    console.log("---result---", result);
    res.redirect("/doctorAvailable").json({ result: result });

    // return result;
  } else {
    res.statusCode = 405;
    res.end();
  }
}
