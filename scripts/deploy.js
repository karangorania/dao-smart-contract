const hre = require('hardhat');

async function main() {
  const NappyToken = await hre.ethers.getContractFactory('NappyToken');
  const nappyToken = await NappyToken.deploy();

  await nappyToken.deployed();

  console.log('NappyToken deployed to:', nappyToken.address);

  const TimeLock = await hre.ethers.getContractFactory('TimeLock');
  const timeLock = await TimeLock.deploy(1, [], []);

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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
