import BookDrivingSlot from "../components/calendar/Calendar";
import "@progress/kendo-theme-default/dist/all.css";
import Layout from "../components/Layout";

function SlotFree() {
  return (
    <Layout>
      <div className="App">
        <hr className="k-my-8" />
        <BookDrivingSlot />
      </div>
    </Layout>
  );
}

export default SlotFree;
