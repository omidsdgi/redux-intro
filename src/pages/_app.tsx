import "@/styles/globals.css";
import "@/styles/index.css";
import {Provider} from "react-redux";
import store from "@/store/Store"
import type { AppProps } from "next/app";

store.dispatch({type:"account/deposit",payload:250})
console.log(store.getState())

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  );
}

