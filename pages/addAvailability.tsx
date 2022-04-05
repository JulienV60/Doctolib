import BookDrivingSlot from "../components/calendar/Slots_availables";
import "@progress/kendo-theme-default/dist/all.css";
import Layout from "../components/Layout";
function App() {
  return (
    <Layout>
      <div className="App">
        <hr className="k-my-8" />

        <BookDrivingSlot />
      </div>
    </Layout>
  );
}

export default App;
