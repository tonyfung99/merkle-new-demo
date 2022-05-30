import "./index.css";
import { DAppProvider, Mainnet, Ropsten } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Change this to your own Infura project id: https://infura.io/register
const INFURA_PROJECT_ID = "4bb4d8fd71c5416690a6c04190a928ec";


const INFURA_MAIN_DOMAIN = "https://mainnet.infura.io/v3/"
const INFURA_ROPSTEN_DOMAIN = "https://ropsten.infura.io/v3/"

const MAINNET = false

const config = {
  readOnlyChainId: MAINNET ? Mainnet.chainId : Ropsten.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: INFURA_MAIN_DOMAIN + INFURA_PROJECT_ID,
    [Ropsten.chainId]: INFURA_ROPSTEN_DOMAIN + INFURA_PROJECT_ID
  },
}

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
// });

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
        <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
