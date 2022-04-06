import Layout from "../components/Layout";
import React, { useState } from "react";
import Link from "next/link";

export default function formPatient() {
  return (
    <Layout>
      <div>
        <form method="POST" action="/api/mongodb/addPatient">
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

          <button type="submit" id="test2">
            <a> Send</a>
          </button>
        </form>
      </div>
    </Layout>
  );
}
