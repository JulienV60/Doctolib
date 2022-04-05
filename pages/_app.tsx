import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@progress/kendo-theme-default/dist/all.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
