import Layout from "../components/Layout";
import React, { useState } from "react";
import Link from "next/link";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
export default function FormDoc() {
  return (
    <Layout>
      <div className="form-group" style={{ paddingTop: "0rem" }}>
        <form method="POST" action="/api/mongodb/addDoc">
          <h1>Who are you ? </h1>
          <input
            className="form-control"
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
          ></input>

          <input
            className="form-control"
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
          ></input>

          <input
            className="form-control"
            id="city"
            type="text"
            placeholder="city"
            name="city"
          ></input>

          <input
            className="form-control"
            id="speciality"
            type="text"
            placeholder="Speciality"
            name="speciality"
          ></input>

          <button type="submit" className="btn btn-primary" id="test2">
            <a> Send</a>
          </button>
        </form>
      </div>
      <br />
      <Link href="/DocAddingSlot" passHref={true}>
        <button className="btn btn-primary">
          <a>
            <DateRangeIcon />
            Calendar
          </a>
        </button>
      </Link>
      <Link href="/DocPlanning" passHref={true}>
        <button className="btn btn-primary">
          <a>
            <ViewAgendaIcon />
            Agenda
          </a>
        </button>
      </Link>
    </Layout>
  );
}
