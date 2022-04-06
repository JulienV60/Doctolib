import { Calendar } from "@progress/kendo-react-dateinputs";
import { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";


const times = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

type Slots = {
  label: string,
  value: string,
  available: boolean,
}

const timeSlots: Slots[] = [{label: "09:00-10:00", value: "09:00-10:00", available: false}, {label: "10:00-11:00", value: "10:00-11:00", available: false}, {label: "11:00-12:00", value: "11:00-12:00", available: false}, {label: "14:00-15:00", value: "14:00-15:00", available: false}, {label: "15:00-16:00", value: "15:00-16:00", available: false}, {label: "16:00-17:00", value: "16:00-17:00", available: false}]

const BookDrivingSlot = (props: any) => {
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Slots[]> (timeSlots);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());


  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;

    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(
      bookingDate.toDateString()
    );

    setBookingTimes(newBookingTimes);
  }, [bookingDate]);

  const onDateChange = (e: any) => {
    setSelectedTimeSlot([]);
    setBookingDate(e.value);
  };

  console.log("test",selectedTimeSlot)

  const hours: string[] = selectedTimeSlot.map((e)=> e.label)


  return (
    <div className="k-my-8">
      <div className="k-mb-4 k-font-weight-bold">Select ur availability</div>

      <div className="k-flex k-display-flex k-mb-4">
        <Calendar value={bookingDate} onChange={onDateChange} />
        <div className="k-ml-4 k-display-flex k-flex-col">
          {/* {times.map((time) => {
            return (
              <button
                key={time}
                className="k-button k-mb-4"
                onClick={(e) => setSelectedTimeSlot(time)}
              > */}
                    <pre>{JSON.stringify(selectedTimeSlot)}</pre>

                <MultiSelect
                  options={timeSlots}
                  value={selectedTimeSlot}
                  onChange={setSelectedTimeSlot}
                  labelledBy="Select your slots"
            />
                {/* {time}
              </button>
            );
          })} */}
        </div>
      </div>



      {bookingDate && selectedTimeSlot ? (
        <div>
          Selected slot: {bookingDate.toDateString()} at {hours}
          <form
            method="POST"
            action={`/api/mongodb/updateSlotDoc?date=${bookingDate.toDateString()}&hours=${hours}`}
          >
            <button>Confirm ur slot</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default BookDrivingSlot;
