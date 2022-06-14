const { expect } = require('chai');
const { ethers } = require('hardhat');
const { networks } = require('../hardhat.config');

describe('Governance', () => {
  let NappyToken;
  let nappyToken;
  let TimeLock;
  let timeLock;
  let Locker;
  let locker;
  let Governance;
  let governance;
  let walletAddress;
  let propId;

  beforeEach(async () => {
    [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
      await ethers.getSigners();

    // NappyToken contract
    NappyToken = await ethers.getContractFactory('NappyToken');
    nappyToken = await NappyToken.deploy();
    await nappyToken.deployed();
    nappyTokenAddress = nappyToken.address;

    // TimeLock contract
    TimeLock = await hre.ethers.getContractFactory('TimeLock');
    timeLock = await TimeLock.deploy(
      1,
      [],
      ['0x0000000000000000000000000000000000000000']
    );

    await timeLock.deployed();

    // Governance Contract
    Governance = await hre.ethers.getContractFactory('Governance');
    governance = await Governance.deploy(nappyToken.address, timeLock.address);

    await governance.deployed();

    // Locker Contract (wallet address for accept the ETH or withdraw)
    walletAddress = '0xb41b7589ae02a4594cd9314f6b500b387027250b';
    Locker = await hre.ethers.getContractFactory('Locker');
    locker = await Locker.deploy(walletAddress);

    await locker.deployed();

    await locker.transferOwnership(timeLock.address);

    await nappyToken.mint(executor.address, 100000000);
    await nappyToken.mint(vote1.address, 100000000);
    await nappyToken.mint(vote2.address, 100000000);
    await nappyToken.mint(vote3.address, 100000000);
    await nappyToken.mint(vote4.address, 100000000);

    await nappyToken.connect(executor).delegate(executor.address);
    await nappyToken.connect(vote1).delegate(vote1.address);
    await nappyToken.connect(vote2).delegate(vote2.address);
    await nappyToken.connect(vote3).delegate(vote3.address);
    await nappyToken.connect(vote4).delegate(vote4.address);

    await timeLock.grantRole(
      await timeLock.PROPOSER_ROLE(),
      governance.address
    );
  });

  it('Should mint the token ', async () => {
    await nappyToken.mint(executor.address, 100000000);
    await nappyToken.mint(vote1.address, 100000000);
    await nappyToken.mint(vote2.address, 100000000);
    await nappyToken.mint(vote3.address, 100000000);
    await nappyToken.mint(vote4.address, 100000000);
  });

  it('Should delegate the token ', async () => {
    await nappyToken.connect(executor).delegate(executor.address);
    await nappyToken.connect(vote1).delegate(vote1.address);
    await nappyToken.connect(vote2).delegate(vote2.address);
    await nappyToken.connect(vote3).delegate(vote3.address);
    await nappyToken.connect(vote4).delegate(vote4.address);
  });

  it('Should grant the role ', async () => {
    await timeLock.grantRole(
      await timeLock.PROPOSER_ROLE(),
      governance.address
    );
  });

  it('Should propose the DAO ', async () => {
    const txnPro = await governance.propose(
      [locker.address],
      [0],
      [locker.interface.encodeFunctionData('withdrawFunds', [])],
      'Donation Demo'
    );

    // await network.provider.send('evm_mine');
    const txn = await txnPro.wait();

    propId = await txn.events[0].args.proposalId;
    console.log(propId);

    await governance.connect(vote1).castVote(propId, 1);
    await governance.connect(vote2).castVote(propId, 1);
    await governance.connect(vote3).castVote(propId, 1);
    await governance.connect(vote4).castVote(propId, 1);
  });

  it('Should queue the propose ', async () => {
    const txnPro = await governance.propose(
      [locker.address],
      [0],
      [locker.interface.encodeFunctionData('withdrawFunds', [])],
      'Donation Demo'
    );

    const txn = await txnPro.wait();

    propId = await txn.events[0].args.proposalId;
    console.log(propId);

    await governance.connect(vote1).castVote(propId, 1);
    await governance.connect(vote2).castVote(propId, 1);
    await governance.connect(vote3).castVote(propId, 1);
    await governance.connect(vote4).castVote(propId, 1);

    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');

    await governance.queue(
      [locker.address],
      [0],
      [locker.interface.encodeFunctionData('withdrawFunds', [])],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Donation Demo'))
    );

    const propState = await governance.state(propId);
    console.log(propState);

    await governance.execute(
      [locker.address],
      [0],
      [locker.interface.encodeFunctionData('withdrawFunds', [])],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Donation Demo'))
    );
    expect(await governance.state());

    const propState1 = await governance.state(propId);
    console.log(propState1);
  });
});
