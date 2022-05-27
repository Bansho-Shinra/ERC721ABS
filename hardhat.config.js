require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require('hardhat-contract-sizer');
//require('@nomiclabs/hardhat-etherscan');
//require('hardhat-gas-reporter');
require('@openzeppelin/hardhat-upgrades');
//require('@nomiclabs/hardhat-ethers');

if (process.env.REPORT_GAS) {
  require('hardhat-gas-reporter');
}

if (process.env.REPORT_COVERAGE) {
  require('solidity-coverage');
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.14',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
    token: 'ETH',
    showTimeSpent: true,
    coinmarketcap: '9fab718f-671c-48ac-9993-d3b9c7d7cffc',
  },
  plugins: ['solidity-coverage'],
};
