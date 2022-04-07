import { ObjectID } from "bson";
import { getCookies } from "cookies-next";
import { cp } from "fs";
import { ObjectId } from "mongodb";

import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || "GET") {
    const mongodb = await getDatabase();
    const cookies = { cookie: getCookies({ req, res }) };
    const AccessTokenPatient = cookies.cookie.AccessTokenPatient;
    const searchIdRdvButton = cookies.cookie.Slot;
    const SplitSlot = searchIdRdvButton.split(",");

    const idSlot = SplitSlot[0];
    const indexSlot = SplitSlot[1];

    const auth0searchUser = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        method: "Post",
        headers: {
          Authorization: `Bearer ${AccessTokenPatient}`,
        },
      }
    ).then((data) => data.json());

    const mailUserAuth0 = auth0searchUser.email;

    const searchIfAlreadyhere = await mongodb
      .db()
      .collection("Patients")
      .findOne({ email: mailUserAuth0 });

    const searchforInputrdv = await mongodb
      .db()
      .collection("Doctors")
      .findOne({
        "Slot.hours._id_slot": new ObjectId(idSlot),
      });

    const categoryDoc = searchforInputrdv?.category;
    const nameDoc = searchforInputrdv?.firstName;
    const lastNameDoc = searchforInputrdv?.lastName;
    const cityDoc = searchforInputrdv?.city;
    const specialityDoc = searchforInputrdv?.speciality;
    const mailDoc = searchforInputrdv?.email;
    const findDateObject = searchforInputrdv?.Slot.filter((date: any) => {
      return (
        date.hours.filter((slot: any) => {
          return slot._id_slot.toString() === idSlot;
        }).length > 0
      );
    });
    const appointmentDate = findDateObject[0].date;

    const findSlotObject = findDateObject[0].hours.filter((slot: any) => {
      return slot._id_slot.toString() === idSlot;
    });
    const patientSlot = findSlotObject[0].hours;

    const newPatient = {
      category: "Patient",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: mailUserAuth0,
      city: req.body.city,
      phone: req.body.phone,
    };
    if (searchIfAlreadyhere === null || undefined) {
      const addPatient = await mongodb
        .db()
        .collection("Patients")
        .insertOne(newPatient);
      if (indexSlot === "0") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.0.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );

        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "1") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.1.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "2") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.2.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "3") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.3.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "4") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.4.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.5.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      }
    } else {
      if (indexSlot === "0") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.0.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );

        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "1") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.1.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "2") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.2.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "3") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.3.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else if (indexSlot === "4") {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.4.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      } else {
        const searchDbDoctorIdRdv = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              "Slot.hours._id_slot": new ObjectId(idSlot),
            },
            {
              $set: { "Slot.$.hours.5.available": false },
            }
          );
        const insertPatientinDbDoctors = await mongodb
          .db()
          .collection("Doctors")
          .updateOne(
            {
              email: mailDoc,
            },
            {
              $push: {
                Reserved: {
                  id: idSlot,
                  name: req.body.firstName,
                  date: appointmentDate,
                  email: mailUserAuth0,
                  phone: req.body.phone,
                  slot: patientSlot,
                },
              },
            }
          );
        const dbPatientUpdate = await mongodb
          .db()
          .collection("Patients")
          .updateOne(
            { email: mailUserAuth0 },
            {
              $push: {
                Appointments: {
                  id: idSlot,
                  category: categoryDoc,
                  firstName: nameDoc,
                  lastName: lastNameDoc,
                  city: cityDoc,
                  speciality: specialityDoc,
                  date: appointmentDate,
                  slot: patientSlot,
                },
              },
            }
          );
        res.redirect("/ConfirmSlot");
      };
    }
  } else {
    res.redirect("/");
    res.end();
  }
}
