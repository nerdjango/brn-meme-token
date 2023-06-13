import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";

import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config: any = {
    solidity: "0.8.18",
    networks: {
        goerli: {
            url: process.env.CHAINSTACK_NODE,
            accounts: {
                mnemonic: process.env.ADMIN_WALLET_SEED,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 10
            }
        },
        bsc: {
            url: process.env.BSC_QUICKNODE,
            accounts: {
                mnemonic: process.env.ADMIN_WALLET_SEED,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 10
            }
        },
        mainnet: {
            url: process.env.ETH_INFURA,
            accounts: {
                mnemonic: process.env.ADMIN_WALLET_SEED,
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 10
            }
        }
    },
    etherscan: {
        apiKey: {
            goerli: process.env.ETHERSCAN_API_KEY || "",
            bsc: process.env.BSCSCAN_API_KEY || ""
        }
    }
};

export default config;
