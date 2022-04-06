import { getCookies } from "cookies-next";
import { ObjectID, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
import { v4 as uuidv4 } from "uuid";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || "GET") {
    const result = req.body;

    const idButtonArray = Object.keys(result);
    const idButton = idButtonArray[0];
    const mongodb = await getDatabase();
    const searchDb = await mongodb
      .db()
      .collection("Doctors")
      .findOne({ "Slot.id": new ObjectId(idButton) })
      .then((data) => data?.Slot);
  } else {
    res.redirect("/");

    res.end();
  }
}
