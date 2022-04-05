import { Calendar } from "@progress/kendo-react-dateinputs";
import { useEffect, useRef, useState } from "react";

const times = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

const BookDrivingSlot = (props: any) => {
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());

  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;

    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(bookingDate);

    setBookingTimes(newBookingTimes);
  }, [bookingDate]);

  const onDateChange = (e: any) => {
    setSelectedTimeSlot(null);
    setBookingDate(e.value);
  };
  console.log(bookingTimes);
  return (
    <div className="k-my-8">
      <div className="k-mb-4 k-font-weight-bold">Select ur availability</div>

      <div className="k-flex k-display-flex k-mb-4">
        <Calendar value={bookingDate} onChange={onDateChange} />
        <div className="k-ml-4 k-display-flex k-flex-col">
          {times.map((time) => {
            return (
              <button
                key={time}
                className="k-button k-mb-4"
                onClick={(e: any) => setSelectedTimeSlot(e.time)}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {bookingDate && selectedTimeSlot ? (
        <div>
          Selected slot: {bookingDate} at {selectedTimeSlot}
          <form
            method="POST"
            action={`/api/mongodb/updateDoc?date=${bookingDate}&time=${selectedTimeSlot}`}
          >
            <button>Confirm ur slot</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default BookDrivingSlot;
