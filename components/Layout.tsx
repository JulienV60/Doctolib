import Head from "next/head";
import React from "react";
import Link from "next/link";

const Layout: React.FC = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Doctolib</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-primary p-4">
            <h4 className="text-white">Collapsed content</h4>
            <span className="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
          <div className="container-fluid">
            <Link href="/">
              <a className="navbar-brand user-select-none">Doctolib</a>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="nnavbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            ></div>
            <Link href="">
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                <a>Login</a>
              </button>
            </Link>

            <Link href="">
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                <a>Logout</a>
              </button>
            </Link>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};
export default Layout;
