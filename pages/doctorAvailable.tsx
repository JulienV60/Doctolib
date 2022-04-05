import Layout from "../components/Layout";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../src/database";
import React from "react";

export default function DoctorAvailable(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [DoctorFree, setDoctorFree] = React.useState<any>([]);
  React.useEffect(() => {
    async function fetchDoctor() {
      let response = await fetch(`/api/mongodb/checkDoc`);
      response = await response.json();
      setDoctorFree(response);
      console.log(response);
    }

    fetchDoctor();
  }, []);
  {
    return (
      <div>
        {DoctorFree.map((element: any, index: any) => {
          return <p key={index}>{element.email}</p>;
        })}
      </div>
    );
  }
}
// -------Brouillon---------------------------------------------------
// import Layout from "../components/Layout";
// import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
// import { getDatabase } from "../src/database";
// import React from "react";

// export default function DoctorAvailable(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const [DoctorFree, setDoctorFree] = React.useState<any>([]);
//   React.useEffect(() => {
//     async function fetchDoctor() {
//       let response = await fetch(`/api/mongodb/checkDoc`);
//       response = await response.json();
//       setDoctorFree(response);
//       console.log(response);
//     }

//     fetchDoctor();
//   }, []);
//   {
//     <div>
//       {DoctorFree.map((element: any, index: any) => {
//         return <p key={index}>{element.email}</p>;
//       })}
//     </div>;
//     // if (req.method === "POST") {
//     //   const speciality = req.body.speciality;
//     //   const city = req.body.city;
//     //   const query = req.body;
//     //   console.log("----spe---", speciality);
//     //   console.log("----city---", city);
//     //   console.log("---req---", query);
//     //   return <div>Hello Worlf</div>;
//     // } else {
//     //   <div>No Hello World</div>;
//     // }
//   }
// }
