import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import React from "react";
import { getCookies } from "cookies-next";
import Link from "next/link";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = { cookie: getCookies({ req, res }) };
  const slot = JSON.stringify(cookies.cookie.Slot);
  const test = JSON.stringify(cookies.cookie.Slot);

  return {
    props: {
      data: test,
      cookie: slot,
    },
  };
};
export default function pleaseLogin({ data, cookie }: any) {
  const Slot = JSON.parse(cookie);

  return (
    <div>
      <Link href={`/api/auth/login?slot=${Slot}`}>
        <a>Plz login</a>
      </Link>
      {/* <form action={`/api/auth/login?slot=${Slot}`} method="GET">
        <button> Plz login</button>
      </form> */}
    </div>
  );
}
