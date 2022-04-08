import BookDrivingSlot from "../components/calendar/Calendar";
import "@progress/kendo-theme-default/dist/all.css";
import Layout from "../components/Layout";
import Link from "next/link";

function SlotFree() {
  return (
    <Layout>
      <div className="App">
        <hr className="k-my-8" />
        <div className="divApp">
          <BookDrivingSlot />
        </div>

        <Link href="/DocForm" passHref={true}>
          <button className="btn btn-primary">
            <a>Form Doctor</a>
          </button>
        </Link>
      </div>
    </Layout>
  );
}

export default SlotFree;
