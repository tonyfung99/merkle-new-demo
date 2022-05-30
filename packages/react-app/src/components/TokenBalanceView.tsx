import React, { useEffect, useState } from "react";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";

import { Box, Container, Typography } from "@mui/material";

import { Contract } from "@ethersproject/contracts";
import { addresses, abis } from "@merkle-news/contracts";

const TokenBalanceView = () => {

    const { error: contractCallError, value: tokenBalance } = useCall({
        contract: new Contract(addresses.ceaErc20, abis.erc20),
        method: "balanceOf",
        args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
    }) ?? {}


    return (<Box>
        <Typography variant="h1" color="initial">
            {tokenBalance}
        </Typography>
    </Box>)
}

export default TokenBalanceView