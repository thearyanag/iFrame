const axios = require("axios");
require("dotenv").config();

let HELIUS_API_KEY = process.env.HELIUS_API_KEY;

let wallet_address = "6wCBfp7b1gxLuRXRg6fd2qttSg8P1Xm83zSH7XM7HEEj";

const all_nft = `https://api.helius.xyz/v0/addresses/${wallet_address}/nft-events?api-key=${HELIUS_API_KEY}`;

const nft_detail = `https://api.helius.xyz/v0/tokens/metadata?api-key=${HELIUS_API_KEY}`;

const getAllNftsForWallet = async () => {
  const result = await axios.get(all_nft);
  let ALL_NFT = result.data;
  for (let i = 0; i < ALL_NFT.length; i++) {
    let NFT_ADDRESS = ALL_NFT[i]["nfts"][0].mint;
    getDetailsForNft(NFT_ADDRESS);
  }
};

const getDetailsForNft = async (nft) => {
  const { data } = await axios.post(nft_detail, {
    mintAccounts: [nft],
  });
  let NFT_DATA = data[0];
  let OFF_CHAIN_DATA = NFT_DATA["offChainData"];
  let NFT_URL = OFF_CHAIN_DATA["image"];
  console.log("nft url: ", NFT_URL);
};

getAllNftsForWallet();
