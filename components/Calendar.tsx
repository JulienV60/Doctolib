import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export function MyApp() {
  const [value, onChange] = React.useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
