
// authors: ['rss3://account:0x7b47640ed97cc08aa188ae091efab2cf3ef48469@ethereum']
// backlinks: "rss3://note:0xb04fecbb67af091a3ea0167953a625f77b77257c9264180a32c48d61c73e02ca-94-5250@ethereum/backlinks"
// date_created: "2022-05-18T03:33:37.000Z"
// date_updated: "2022-05-18T03:33:37.000Z"
// identifier: "rss3://note:0xb04fecbb67af091a3ea0167953a625f77b77257c9264180a32c48d61c73e02ca-94-5250@ethereum"
// links: "rss3://note:0xb04fecbb67af091a3ea0167953a625f77b77257c9264180a32c48d61c73e02ca-94-5250@ethereum/links"
// metadata: {collection_address: '0xf220db48f0d3ca8a9833e0353e7497dbceae7ac6', collection_name: '', contract_type: 'ERC721', from: '0x2c0ce11e6569beab9f0235a743f8d3d4e45aec37', log_index: '94', …}
// related_urls: (3) ['https://etherscan.io/tx/0xb04fecbb67af091a3ea0167953a625f77b77257c9264180a32c48d61c73e02ca', 'https://etherscan.io/nft/0xf220db48f0d3ca8a9833e0353e7497dbceae7ac6/5250', 'https://opensea.io/assets/0xf220db48f0d3ca8a9833e0353e7497dbceae7ac6/5250']
// source: "Ethereum NFT"
// tags: ['NFT']

export type TokenStandard = "Native" | "ERC1155" | "ERC721" | "ERC20"

export type Network = "ethereum" | "polygon" | "bnb"

export const NULL_ADDR = "0x0000000000000000000000000000000000000000"

export type RSS3_LINK = string

export type RSS3_Resource = 'account' | 'notes' | 'link'

const RSS_PREFIX = 'rss3://'

export const parseLink = (link: RSS3_LINK) => {
    if (!link) return null
    if (!link.startsWith(RSS_PREFIX)) throw new Error(`${link} not rss3 format`)

    const [type, preValue] = link.replace(RSS_PREFIX, '').split(':')
    const [identifier, network] = preValue.split('@')
    return { type, identifier, network }
}

export const buildLink = (addr: string, resource: RSS3_Resource = 'account', network: Network = 'ethereum') => `${RSS_PREFIX}${resource}:${addr}@${network}`


export interface Metadata {
    from: RSS3_LINK
    network: Network
    proof: string
    to: RSS3_LINK
    token_standard: TokenStandard
    token_symbol: string

}

export interface NativeMeta extends Metadata {
    amount: "0"
    decimal: 18
    transaction_hash: string
}

export interface NFTMeta extends Metadata {
    collection_address: string,
    collection_name: string,
    contract_type: TokenStandard
    log_index: string
    token_id: string
}

export type Tag = 'NFT' | 'ETH' | 'Mirror Entry' | 'Token' | 'ETH'


export interface EventNote {
    authors: RSS3_LINK[]
    backlinks: RSS3_LINK
    date_created: string
    date_updated: string
    identifier: RSS3_LINK
    links: RSS3_LINK
    metadata: Metadata
    related_urls: string[]
    source: RSS3_LINK[]
    tags: Tag[]
}

export interface MIMEContent {
    type: string,
    content: string,
    mime_type: string
}

export interface ArticleNote extends EventNote {
    title: string,
    summary: string,
    attachments: MIMEContent[]
}