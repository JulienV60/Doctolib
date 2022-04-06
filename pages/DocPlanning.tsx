import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import Layout from "../components/Layout";
import Link from "next/link";
import RoomScheduler from "../components/calendar/Scheduler";
import Scheduler from "../components/calendar/Scheduler";
const MyAgenda = () => {
  return (
    <Layout>
      <div>
        <div className="App">
          <hr className="k-my-8" />
          <Scheduler />
          <Link href="/api/auth/logout" passHref={true}>
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
              <a>Logout</a>
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default MyAgenda;
