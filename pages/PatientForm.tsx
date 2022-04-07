import Layout from "../components/Layout";
import React, { useState } from "react";
import Link from "next/link";

export default function formPatient() {
  return (
    <Layout>
      <div>
        <form method="POST" action="/api/mongodb/updatePatient">
          <h1>Who is the appointment for ? </h1>
          <input
            className=".form-control"
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
          ></input>

          <input
            className=".form-control"
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
          ></input>

          <input
            className=".form-control"
            id="city"
            type="text"
            placeholder="City"
            name="city"
          ></input>
          <input
            className=".form-control"
            id="speciality"
            type="text"
            placeholder="Phone"
            name="phone"
          ></input>
          <button type="submit" id="test2">
            <a> Send</a>
          </button>
        </form>
      </div>
    </Layout>
  );
}
