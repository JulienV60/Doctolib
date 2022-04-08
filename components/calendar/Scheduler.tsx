import * as React from "react";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  TimelineView,
  AgendaView,
} from "@progress/kendo-react-scheduler";

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
  const test = user.map((e: any) => ({
    id: e.id,
    title: e.title,
    start: new Date(e.start.toString()),
    end: new Date(e.end.toString()),
  }));
  console.log(test);

  const data = [
    {
      id: 0,
      title: "Brast with Tom",
      start: new Date("2022-04-08T08:30:00.000Z"),
      end: new Date("2022-04-08T09:00:00.000Z"),
    },
  ];
  console.log(data);
  return (
    <Scheduler data={test} defaultDate={displayDate}>
      <AgendaView />
      <TimelineView />
      <DayView />
      <WeekView />
      <MonthView />
    </Scheduler>
  );
};
export default App;
