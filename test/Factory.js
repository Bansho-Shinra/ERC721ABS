//const { expect } = require("chai");
const { ethers } = require('hardhat');

describe('Test', function () {
  it('I am a pen.', async function () {
    let tx;

    const Factory = await ethers.getContractFactory('Factory');
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log('Factory deployed to ', factory.address);

    tx = await factory.deploy('PFP', 'PFP', '0x4F542fb9544F53f047233f5cf4f4A84372FdABf9');
    await tx.wait();
    /*
    console.log(await factory.nextTokenId());
    tx = await factory.safeMint(await factory.owner(), 5);
    await tx.wait();
    console.log(await factory.nextTokenId());
    */
  });
});
