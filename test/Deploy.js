//const { expect } = require("chai");
const { ethers } = require('hardhat');

describe('Test', function () {
  it('I am a pen.', async function () {
    this.timeout(1000000);
    let tx;

    const Factory = await ethers.getContractFactory('Factory');
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log('Factory deployed to ', factory.address);

    tx = await factory.deploy(
      'Unicorn-chan PFP',
      'UCPFP',
      '0xBb2741E75DC07C9ca11a297A9Ca73C6F214F769d',
      'ipfs://QmPQSoyeCQ5WXQP6JAsfSSyFVjUPF1R57tLQMqprYL761M'
    );
    await tx.wait();
    /*
    console.log(await factory.nextTokenId());
    tx = await factory.safeMint(await factory.owner(), 5);
    await tx.wait();
    console.log(await factory.nextTokenId());
    */
  });
});
