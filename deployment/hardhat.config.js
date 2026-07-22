import "dotenv/config";

import hardhatVerify from "@nomicfoundation/hardhat-verify";
import hardhatMocha from "@nomicfoundation/hardhat-mocha"; // adds: npx hardhat test
import hardhatEthers from "@nomicfoundation/hardhat-ethers"; // ethers on network connection

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BSCSCAN_KEY = process.env.BSCSCAN_KEY || "";

export default {
    solidity: "0.8.20",
    defaultNetwork: "node", // use local in-memory blockchain by default, not testnet
    plugins: [hardhatMocha, hardhatEthers, hardhatVerify],
    networks: {
        node: { type: "edr-simulated" },
        bscTestnet: {
            type: "http", // real external network
            url: "https://data-seed-prebsc-1-s1.binance.org:8545", // BSC testnet RPC
            chainId: 97, // BSC testnet ID
            accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // wallet used to sign transactions (empty if no .env, tests still run)
        },
    },

    // BSCScan verification config
    verify: {
        etherscan: {
            apiKey: BSCSCAN_KEY,
        },
    },
};