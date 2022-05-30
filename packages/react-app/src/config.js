export default {
    url: 'https://mirror-tokengate.xyz/graphql',
    prefix: "I authorize publishing on mirror.xyz from this device using:\n",
    mirror_api: {
        VerifyPublicKey: "query VerifyPublicKey($publicKey: String!) {\n  verifyPublicKey(publicKey: $publicKey) {\n    address\n    __typename\n  }\n}\n",
        AddSigningKey: "mutation AddSigningKey($ethAddress: String!, $ensLabel: String, $publicKey: String!, $signature: String!) {\n  addSigningKey(\n    ethAddress: $ethAddress\n    ensLabel: $ensLabel\n    publicKey: $publicKey\n    signature: $signature\n  ) {\n    id\n    publicKey\n    signature {\n      id\n      signingKeyId\n      signature\n      message\n      __typename\n    }\n    __typename\n  }\n}\n",
        UpdateProject: "mutation UpdateProject($settings: String!, $digest: String!, $key: String!, $projectAddress: String, $signature: String!, $timestamp: String!, $userAddress: String!) {\n  updateProject(\n    settings: $settings\n    digest: $digest\n    key: $key\n    projectAddress: $projectAddress\n    signature: $signature\n    timestamp: $timestamp\n    userAddress: $userAddress\n  ) {\n    ...projectDetails\n    __typename\n  }\n}\n\nfragment projectDetails on ProjectType {\n  _id\n  address\n  avatarURL\n  description\n  displayName\n  domain\n  ens\n  gaTrackingID\n  mailingListURL\n  headerImage {\n    ...mediaAsset\n    __typename\n  }\n  theme {\n    ...themeDetails\n    __typename\n  }\n  __typename\n}\n\nfragment mediaAsset on MediaAssetType {\n  id\n  cid\n  mimetype\n  sizes {\n    ...mediaAssetSizes\n    __typename\n  }\n  url\n  __typename\n}\n\nfragment mediaAssetSizes on MediaAssetSizesType {\n  og {\n    ...mediaAssetSize\n    __typename\n  }\n  lg {\n    ...mediaAssetSize\n    __typename\n  }\n  md {\n    ...mediaAssetSize\n    __typename\n  }\n  sm {\n    ...mediaAssetSize\n    __typename\n  }\n  __typename\n}\n\nfragment mediaAssetSize on MediaAssetSizeType {\n  src\n  height\n  width\n  __typename\n}\n\nfragment themeDetails on UserProfileThemeType {\n  accent\n  colorMode\n  __typename\n}\n",
        CreateEntry: "mutation CreateEntry($body: String!, $digest: String!, $entryContributorAddresses: [String!], $featuredImageId: Int, $hideTitleInEntry: Boolean, $key: String!, $projectAddress: String!, $signature: String!, $settings: EntrySettingsInputType!, $status: String!, $timestamp: Int!, $title: String!, $userAddress: String!) {\n  createEntry(\n    body: $body\n    digest: $digest\n    entryContributorAddresses: $entryContributorAddresses\n    featuredImageId: $featuredImageId\n    hideTitleInEntry: $hideTitleInEntry\n    key: $key\n    projectAddress: $projectAddress\n    settings: $settings\n    signature: $signature\n    status: $status\n    timestamp: $timestamp\n    title: $title\n    userAddress: $userAddress\n  ) {\n    id\n    originalDigest\n    digest\n    __typename\n  }\n}\n",
    },

    hashingAlgorithm: 'SHA-256',
    signingAlgorithm: {
        name: 'ECDSA',
        hash: { name: 'SHA-256' },
    }
}
