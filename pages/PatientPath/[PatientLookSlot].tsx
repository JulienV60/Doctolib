import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getDatabase } from "../../src/database";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const speciality = context.query.speciality;
  const city = context.query.city;
  const mongodb = await getDatabase();
  const filterdbDoc = await mongodb
    .db()
    .collection("Doctors")
    .find({ speciality: speciality, city: city })
    .toArray();

  const stringifyResult = JSON.stringify(filterdbDoc);
  return {
    props: {
      data: stringifyResult,
    },
  };
};
export default function LoginDoctor({ data }: any) {
  const dataParse = JSON.parse(data);
  const slotdata = dataParse.map((element: any) => {
    return element.Slot[0];
  });

  return (
    <Layout>
      <div>
        {dataParse.map((element: any, index: any) => {
          return (
            <div key={index}>
              {element.category}
              {element.lastName}
              <br></br>
              {element.Slot.map((element: any, index: any) => {
                return (
                  <div key={index} id={element._id_date}>
                    {element.date}

                    {element.hours === undefined || null ? (
                      <>No slots available</>
                    ) : (
                      element.hours.map((element: any, index: any) => {
                        return (
                          <div key={index}>
                            {element.avalaible === true ? (
                              <form
                                method="POST"
                                action={`/api/mongodb/addPatient?index=${index}`}
                              >
                                <button
                                  className="btn btn-outline-dark my-2 my-sm-0"
                                  id={`${element._id_slot}`}
                                  name={`${element._id_slot}`}
                                >
                                  {element.hours}
                                </button>
                              </form>
                            ) : (
                              <>
                                {" "}
                                <form
                                  method="POST"
                                  action={`/api/mongodb/addPatient?index=${index}`}
                                >
                                  <button
                                    disabled={element.available === false}
                                    className="btn btn-outline-dark my-2 my-sm-0"
                                    id={`${element._id_slot}`}
                                    name={`${element._id_slot}`}
                                  >
                                    {element.hours}
                                  </button>
                                </form>
                              </>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
