import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import React from "react";
import { getCookies } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = { cookie: getCookies({ req, res }) };

  const test = JSON.stringify(cookies.cookie.Slot);

  return {
    props: {
      data: test,
    },
  };
};
export default function pleaseLogin({ data }: any) {
  const result = JSON.parse(data);
  console.log(result);
  return (
    <div>
      <form action={`/api/auth/login`} method="GET">
        <button> Plz login</button>
      </form>
      ;
    </div>
  );
}
