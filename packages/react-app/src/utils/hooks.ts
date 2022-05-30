import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress, useBlockNumber } from "@usedapp/core";

import logo from "./ethereumLogo.png";

import { addresses, abis } from "@merkle-news/contracts";
import Button from "@mui/material/Button";

import Config from '../config'
import React, { useEffect, useState } from "react";
import axios from "axios"
import { Block } from "@ethersproject/abstract-provider"


export const usePrivateKey = () => {

}

export const useGenerateKey = () => {

  const { account, activateBrowserWallet, deactivate, error, library } = useEthers();


  const signer = library.getSigner();


  const [keyPair, setKeyPair] = useState<CryptoKeyPair>(null)

  const generateKey = async () => {

    var _keyPair = keyPair
    if (!_keyPair) {
      _keyPair = await window.crypto.subtle.generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-256"
        },
        true,
        ["sign", "verify"]
      )
      setKeyPair(_keyPair)
    }


    console.log('keyPair', keyPair, _keyPair)

    const publicKey = await window.crypto.subtle.exportKey('jwk', _keyPair.publicKey)
    console.log('export key ', JSON.stringify(publicKey))

    // ask user to sign the key
    const message = Config.prefix + JSON.stringify(publicKey)
    const signature = await signer.signMessage(message)
    console.log('before signature', message)
    console.log('after signature', signature)

    const operationName = "AddSigningKey"
    const variables = {
      ethAddress: (window as any).ethereum.selectedAddress,
      publicKey: JSON.stringify(publicKey),
      signature: signature
    }

    console.log(variables)
    // let { data, status } = await requestMirrorAPI(operationName, variables)
  }

  useEffect(() => {
    if (account) {
      generateKey()
    }
  }, [account])

  return keyPair
}


export const useRequest = (url, action) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [block, setBlock] = useState<Block>(null)

  const { account, activateBrowserWallet, deactivate, library } = useEthers();


  const gettingBlock = async () => {
    const blockNumber = await library.getBlockNumber()
    const block = await library.getBlock(blockNumber)
    setBlock(block)
  }

  useEffect(() => { gettingBlock() }, [])



  const payload = {
    inner: {
      // latest eth block number when liking
      sync_number: block?.number,
      // hash of latest eth block 
      sync_hash: block?.hash,
      // the user who initiates this interaction
      source: account,
      // interaction type
      action
    },
    // signature of the inner part signed with the P-256 private key stored in user browser
    sig: "2AAE0030826558C75A3641F434BCD1F82FEF7110E55A875314173951ED154F127958B19AF06060470F12B1AB2F6202292D2E33609A58B6F60503D21C2D06A6EB"
  }


  useEffect(() => {
    if (!block) return


    (async () => {
      try {
        const response = await axios.post(
          url,
          payload
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, [block]);


  return { data, error, loaded };
};



