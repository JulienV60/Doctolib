import * as React from "react";
import { Scheduler, DayView, WeekView } from "@progress/kendo-react-scheduler";

const App = () => {
  const [user, setUser] = React.useState<any>([]);
  React.useEffect(() => {
    async function fetchApi() {
      let response = await fetch(`/api/agenda`).then((data) => data.json());
      setUser(response);
      console.log(response);
    }
    fetchApi();
  }, []);
  const displayDate = new Date();
  const defaultData = user.map((e: any) => ({
    id: e.index,
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
  }));

  console.log(user);
  return (
    <Scheduler data={defaultData} defaultDate={displayDate}>
      <DayView />
      <WeekView />
    </Scheduler>
  );
};
export default App;
