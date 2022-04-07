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
        </div>
      </div>
    </Layout>
  );
};

export default MyAgenda;
