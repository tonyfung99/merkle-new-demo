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

import { ethers } from 'ethers'
import RSS3, { utils as RSS3Utils } from 'rss3'
import { buildLink, EventNote, MediaNote, Tag } from "./schema";


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


const DEFAULT_LIST = ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045',]



export const useProfileFeed = (address: string, tags?: Tag, exclude_tags?: string[]) => {

  const [profile, setProfile] = useState<MediaNote[]>(null)

  React.useEffect(() => {

    if (!address) return null

    const route = `https://pregod.rss3.dev/v0.4.0/account:${address}@ethereum/notes`

    const params = (tags || exclude_tags) ? {
      tags
    } : null

    axios.get(route, { params }).then(res => {
      console.log(res.data)
      setProfile(res.data.list)
    })
  }, [address, tags])

  return profile
}


export const useProfile = (addr: string) => {

  React.useEffect(() => {

  }, [])

}


// TODO: useContext to cache the avatar response across the whole app, currently cache broken
export const useAvatar = (addr: string) => {

  const { library } = useEthers();
  const [lookup, setLookup] = useState({})

  React.useEffect(() => {

    const result = lookup[addr]
    if (!result) {
      library.getAvatar(addr).then(res => {
        setLookup(pre => {
          return { ...pre, [addr]: res }
        })
      })
    } else {
      return result
    }

  }, [addr])

  return lookup[addr]

}

export const createPost = async (summary: string) => {


  // await rss3.items.custom.post({
  //   summary
  // }).then(res => console.log(res))
  //   .catch(err => console.warn(err))

  // await rss3.files.sync();

}


// interaction with merkle news backend - pending
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



