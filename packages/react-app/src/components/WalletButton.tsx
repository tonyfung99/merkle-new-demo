import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import logo from "./ethereumLogo.png";

import { addresses, abis } from "@merkle-news/contracts";
import Button from "@mui/material/Button";

import Config from '../config'
import { useGenerateKey, useRequest } from "../utils/hooks";


function WalletButton() {
    const [rendered, setRendered] = useState("");

    const ens = useLookupAddress();
    const { account, activateBrowserWallet, deactivate, error, library } = useEthers();


    console.log('account', account)
    // const keyPairs = useGenerateKey()


    useEffect(() => {
        if (ens) {
            setRendered(ens);
        } else if (account) {
            setRendered(shortenAddress(account));
        } else {
            setRendered("");
        }
    }, [account, ens, setRendered]);

    useEffect(() => {
        if (error) {
            console.error("Error while connecting wallet:", error.message);
        }
    }, [error]);



    return (
        <Button
            onClick={() => {
                if (!account) {
                    activateBrowserWallet();
                } else {
                    deactivate();
                    console.log('deactviate clicked')
                }
            }}
        >
            {rendered === "" && "Connect Wallet"}
            {rendered !== "" && rendered}
        </Button>
    );
}

export default WalletButton