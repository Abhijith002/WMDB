import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
// import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "dotenv/config"
import "hardhat-deploy"
import { HardhatUserConfig } from "hardhat/config"

const PRIVATE_KEY = process.env.PRIVATE_KEY || "privatKey"

const config: HardhatUserConfig = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    // rinkeby: {
    //   url: RINKEBY_RPC_URL,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 4,
    // },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/kS-ULMP3-Ksm1_BMwQCyRoaIUYVOfkmw",
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
}
// etherscan: {
//   apiKey: ETHERSCAN_API_KEY,
// },
// gasReporter: {
//   enabled: true,
//   currency: "USD",
//   outputFile: "gas-report.txt",
//   noColors: true,
//   // coinmarketcap: COINMARKETCAP_API_KEY,
// },

export default config
// module.exports = {
//   solidity: "0.8.9",
// };
