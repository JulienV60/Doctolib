import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mongodb = await getDatabase();
  const searchDoc = await mongodb.db().collection("Doctors").find();
  return;
}
