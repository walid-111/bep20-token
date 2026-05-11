import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";
const BSCSCAN_KEY = process.env.BSCSCAN_KEY || "";

export default {
    solidity: "0.8.20",
    defaultNetwork: "node",
    networks: {
        node: {
            type: "edr-simulated",
        },
        bscTestnet: {
            type: "http",
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            bscTestnet: BSCSCAN_KEY,
        },
        customChains: [
            {
                network: "bscTestnet",
                chainId: 97,
                urls: {
                    apiURL: "https://api-testnet.bscscan.com/api",
                    browserURL: "https://testnet.bscscan.com",
                },
            },
        ],
    },
};