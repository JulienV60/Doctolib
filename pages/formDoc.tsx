import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getDatabase } from "../src/database";
import Calendar from "react-calendar";
export default function formDoc() {
  return (
    <Layout>
      <div>
        <form>
          <input
            className=".form-control"
            id="first-name"
            type="text"
            placeholder="First Name"
          ></input>

          <input
            className=".form-control"
            id="last-name"
            type="text"
            placeholder="Last Name"
          ></input>

          <input
            className=".form-control"
            id="email"
            type="text"
            placeholder="City"
          ></input>

          <input
            className=".form-control"
            id="speciality"
            type="text"
            placeholder="Speciality"
          ></input>

          <button type="submit" id="test2">
            <a> Send</a>
          </button>
        </form>
      </div>
    </Layout>
  );
}
