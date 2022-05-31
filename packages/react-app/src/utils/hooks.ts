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
import { buildLink, EventNote, Tag } from "./schema";


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


export const useFeeds = (addresses: string[], tags?: Tag[]) => {

  const [feeds, setFeeds] = useState<EventNote[]>([])

  React.useEffect(() => {

    if (!addresses) {
      return
    }

    const body = {
      addresses: addresses.map(addr => buildLink(addr)),
      tags: tags
    }

    const route = `https://pregod.rss3.dev/v0.4.0/notes`
    axios.post(route, body).then(res => {
      console.log(res.data)
      setFeeds(res.data.list)
    })
  }, [])

  return feeds
}

export const useProfileFeed = (address: string, tags?: Tag, exclude_tags?: string[]) => {

  const [profile, setProfile] = useState<EventNote[]>(null)

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


export const getRss3Instance = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const rss3 = new RSS3({
    endpoint: 'https://prenode.rss3.dev',
    address: await signer.getAddress(),
    sign: async (data) => await signer.signMessage(data),
  });

  const list = await rss3.profile.getList(['0x1234567890123456789012345678901234567890']);
  console.log('0x1234567890123456789012345678901234567890', list)
  return rss3
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
  const rss3 = await getRss3Instance()

  await rss3.items.custom.post({
    summary
  }).then(res => console.log(res))
    .catch(err => console.warn(err))

  await rss3.files.sync();

}

export const useRss3 = () => {

  // const assets 

  const [feeds, setFeeds] = React.useState([])

  useEffect(() => {
    (async () => {
      const rss3 = await getRss3Instance()

      const addr = rss3.account.address
      const links = await rss3.links.getList(addr, 'following')
      const assets = await rss3.assets.auto.getList(addr)

      const nfts: string[] = []
      const mirrors: string[] = []

      assets.map(asset => {
        const [eco, address, assetType, uri] = asset.split('-')
        if (assetType.includes('Mirror')) {
          mirrors.push(asset)
        } else if (assetType.includes('NFT')) {
          nfts.push(asset)
        }
      })

      const details = await rss3.assets.getDetails({
        assets: mirrors,
        full: true,
      });


      console.log('rss3 address:', addr, ' | links', links, assets, nfts, mirrors)
      console.log('detail assets', details)


      // get feeds:
      const page1 = await rss3.items.getList({
        limit: 100,
        persona: addr,
      });

      setFeeds(page1)

      console.log('feed', page1)
    })()

  }, [])

  return [feeds]

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



