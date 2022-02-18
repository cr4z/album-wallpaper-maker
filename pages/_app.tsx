import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalContextWrapper } from "../src/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextWrapper>
      <Component {...pageProps} />
    </ModalContextWrapper>
  );
}

export default MyApp;
