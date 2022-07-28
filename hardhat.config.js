/**
* @type import('hardhat/config').HardhatUserConfig
*/

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 6
      }
     }
   },
  gasReporter: {
   currency: 'USD',
   coinmarketcap: "<APIKEY>",
   showTimeSpent: true
 },
 mocha: {
   timeout: 300000
 }
};
