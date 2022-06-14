const { ethers } = require('hardhat');
const hre = require('hardhat');

const GOVERNANCE_ADDRESS = '0x47F88eeA94bA9D50D2f6A7e4fC734C2792dbD01D';
const LOCKER_ADDRESS = '0xFD28e6B4b91B3D1E2664577226105720567b8448';

const propId =
  '8248301548580824015364459237635209329049600785932343324222339379515500855878';

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.attach(GOVERNANCE_ADDRESS);

  const Locker = await hre.ethers.getContractFactory('Locker');
  const locker = await Locker.attach(LOCKER_ADDRESS);

  await governance.connect(vote1).castVote(propId, 1);
  await governance.connect(vote2).castVote(propId, 1);
  await governance.connect(vote3).castVote(propId, 1);
  await governance.connect(vote4).castVote(propId, 1);

  const checkState = await governance.state(propId);
  console.log(checkState);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
