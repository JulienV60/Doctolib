import Layout from "../components/Layout";
import React, { useState } from "react";

export default function formDoc() {
  return (
    <Layout>
      <div>
        <form method="POST" action="/api/mongodb/updateDoc">
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
            placeholder="city"
            name="city"
          ></input>

          <input
            className=".form-control"
            id="speciality"
            type="text"
            placeholder="Speciality"
            name="speciality"
          ></input>

          <button type="submit" id="test2">
            <a> Send</a>
          </button>
        </form>
      </div>
    </Layout>
  );
}
