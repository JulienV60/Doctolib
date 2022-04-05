import { getCookies } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" || "POST") {
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
    const mailUserAuth0 = auth0searchUser.name;
    const mongodb = await getDatabase();
    const newDoctor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: mailUserAuth0,
      city: req.body.city,
      speciality: req.body.speciality,
      slots: {
        Lundi11: {
          slot1: {
            available: false,
            clientId: "",
          },
          slot2: {
            available: false,
            clientId: "",
          },
          slot3: {
            available: false,
            clientId: "",
          },
          slot4: {
            available: false,
            clientId: "",
          },
          slot5: {
            available: false,
            clientId: "",
          },
        },
        Mardi12: {
          slot1: {
            available: false,
            clientId: "",
          },
          slot2: {
            available: false,
            clientId: "",
          },
          slot3: {
            available: false,
            clientId: "",
          },
          slot4: {
            available: false,
            clientId: "",
          },
          slot5: {
            available: false,
            clientId: "",
          },
        },
        Mercredi13: {
          slot1: {
            available: false,
            clientId: "",
          },
          slot2: {
            available: false,
            clientId: "",
          },
          slot3: {
            available: false,
            clientId: "",
          },
          slot4: {
            available: false,
            clientId: "",
          },
          slot5: {
            available: false,
            clientId: "",
          },
        },
        Jeudi14: {
          slot1: {
            available: false,
            clientId: "",
          },
          slot2: {
            available: false,
            clientId: "",
          },
          slot3: {
            available: false,
            clientId: "",
          },
          slot4: {
            available: false,
            clientId: "",
          },
          slot5: {
            available: false,
            clientId: "",
          },
        },
        Vendredi15: {
          slot1: {
            available: false,
            clientId: "",
          },
          slot2: {
            available: false,
            clientId: "",
          },
          slot3: {
            available: false,
            clientId: "",
          },
          slot4: {
            available: false,
            clientId: "",
          },
          slot5: {
            available: false,
            clientId: "",
          },
        },
      },
    };
    const addDoctor = await mongodb
      .db()
      .collection("Doctors")
      .insertOne(newDoctor);
    res.redirect("/DocAccount");
  } else {
    res.statusCode = 405;
    res.end();
  }
}
