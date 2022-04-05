import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const data = await mongodb
    .db()
    .collection("Doctors")
    .find({ email: "julienkevin@gmail.com" })
    .toArray();
  console.log("data", data);

  const dataStringify = JSON.stringify(data);
  const dataParse = JSON.parse(dataStringify);

  console.log("dataStringify", dataStringify);
  console.log("dataParse", dataParse);
  return {
    props: {
      data: dataStringify,
    },
  };
};
export default function LoginDoctor({ data }: any) {
  const dataParse = JSON.parse(data);
  return (
    <>
      toto
      <p>
        {dataParse.map((element: { firsname: any }): void => {
          element.firsname;
        })}
      </p>
    </>
  );
}
