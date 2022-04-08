import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import React from "react";
import { getCookies } from "cookies-next";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import Layout from "../components/Layout";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = { cookie: getCookies({ req, res }) };
  const slot = JSON.stringify(cookies.cookie.Slot);

  return {
    props: {
      cookie: slot,
    },
  };
};
export default function pleaseLogin({ data, cookie }: any) {
  const Slot = JSON.parse(cookie);

  return (
    <Layout>
      <div className="divPleaseLogin">
        <h4>You are not logged in, please log in.</h4>
        <br />
        <button>
          <Link href={`/api/auth/login?slot=${Slot}`}>
            <a>
              Login as a Patient &nbsp; &nbsp;
              <LoginIcon />
            </a>
          </Link>
        </button>
        {/* <form action={`/api/auth/login?slot=${Slot}`} method="GET">
        <button> Plz login</button>
      </form> */}
      </div>
    </Layout>
  );
}
