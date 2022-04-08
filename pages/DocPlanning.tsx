import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import Layout from "../components/Layout";
import Link from "next/link";
import RoomScheduler from "../components/calendar/Scheduler";
import App from "../components/calendar/Scheduler";
const MyAgenda = () => {
  return (
    <Layout>
      <div>
        <div className="App">
          <hr className="k-my-8" />
          <App />
          <Link href="/DocForm" passHref={true}>
            <button className="btn btn-primary">
              <a>Form Doctor</a>
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default MyAgenda;
