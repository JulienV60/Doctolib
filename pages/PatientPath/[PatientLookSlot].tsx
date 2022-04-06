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
    return element.Slot;
  });

  return (
    <Layout>
      <div>
        {dataParse.map((element: any, index: any) => {
          return (
            <div key={index}>
              <p key={index}>{element.category}</p>
              <p key={index}>{element.firstName}</p>
              <p key={index}>{element.lastName}</p>
              <p key={index}>{element.speciality}</p>
              <div key={element.id}>
                <form
                  method="POST"
                  action="/api/mongodb/updatePatient"
                  id={element.id}
                  key={element.id}
                >
                  <button
                    key={element.id}
                    className="btn btn-outline-dark my-2 my-sm-0"
                    type="submit"
                    id={element.id}
                    name={element.id}
                  >
                    {element.date}
                    {element.time}
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        {slotdata[0].map((element: any, index: any) => {
          return (
            <div key={element.id}>
              <form
                method="POST"
                action="/api/mongodb/addPatient"
                id={element.id}
                key={element.id}
              >
                <p
                  key={element.id}
                  className="btn btn-outline-dark my-2 my-sm-0"
                  // type="button"
                  id={element.id}
                  // name={element.id}
                >
                  {element.date}
                  {element.time}
                </p>
                {/* <Link href="/api/auth/callback" passHref={true}> */}
                <button
                  key={element.id}
                  className="btn btn-outline-dark my-2 my-sm-0"
                  type="submit"
                  id={element.id}
                  name={element.id}
                >
                  <a>Book this slot</a>
                </button>
                {/* </Link> */}
              </form>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
