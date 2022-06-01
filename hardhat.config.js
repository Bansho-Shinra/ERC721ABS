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

const {
  PRIVATE_KEY,
  PRIVATE_KEY_POLYGON,
  PRIVATE_KEY_MUMBAI,
  PRIVATE_KEY_TEST,
  ALCHEMY_API_KEY_MAINNET,
  ALCHEMY_API_KEY_POLYGON,
  // ALCHEMY_API_KEY_MUMBAI,
  // POLYGONSCAN_API_KEY,
} = process.env;

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
  networks: {
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY_MAINNET}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    polygonbansho: {
      //url: `https://polygon-rpc.com`,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    polygontest: {
      url: `https://polygon-rpc.com`,
      //url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`,
      accounts: [`${PRIVATE_KEY_TEST}`], // Deploy用
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`,
      accounts: [`${PRIVATE_KEY_POLYGON}`],
    },
    mumbai: {
      //      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY_MUMBAI}`,
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [`${PRIVATE_KEY_TEST}`],
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      accounts: [`${PRIVATE_KEY_MUMBAI}`],
    },
    optimismkovan: {
      url: `https://kovan.optimism.io`,
      accounts: [`${PRIVATE_KEY_MUMBAI}`],
    },
    astar: {
      url: `https://evm.astar.network`,
      accounts: [`${PRIVATE_KEY}`],
    },
    astart: {
      url: `https://evm.astar.network`,
      accounts: [`${PRIVATE_KEY_TEST}`],
    },
    localhost: {
      timeout: 40000000,
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
