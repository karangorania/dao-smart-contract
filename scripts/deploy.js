const hre = require('hardhat');

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const NappyToken = await hre.ethers.getContractFactory('NappyToken');
  const nappyToken = await NappyToken.deploy();

  await nappyToken.deployed();

  console.log('NappyToken deployed to:', nappyToken.address);

  const TimeLock = await hre.ethers.getContractFactory('TimeLock');
  const timeLock = await TimeLock.deploy(
    1,
    [],
    ['0x0000000000000000000000000000000000000000']
  );

  await timeLock.deployed();

  console.log('TimeLock deployed to:', timeLock.address);

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.deploy(
    nappyToken.address,
    timeLock.address
  );

  await governance.deployed();

  console.log('Governance deployed to:', governance.address);

  const walletAddress = '0xb41b7589ae02a4594cd9314f6b500b387027250b';
  const Locker = await hre.ethers.getContractFactory('Locker');
  const locker = await Locker.deploy(walletAddress);

  await locker.deployed();

  console.log('Locker deployed to:', locker.address);

  await locker.transferOwnership(timeLock.address);

  await nappyToken.mint(vote1.address, 100000000);
  await nappyToken.mint(vote2.address, 100000000);
  await nappyToken.mint(vote3.address, 100000000);
  await nappyToken.mint(vote4.address, 100000000);

  await nappyToken.connect(vote1).delegate(vote1.address);
  await nappyToken.connect(vote2).delegate(vote2.address);
  await nappyToken.connect(vote3).delegate(vote3.address);
  await nappyToken.connect(vote4).delegate(vote4.address);

  await timeLock.grantRole(await timeLock.PROPOSER_ROLE(), governance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
