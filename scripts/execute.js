const hre = require('hardhat');
const { ethers } = require('hardhat');

const GOVERNANCE_ADDRESS = '0x032BA118F762c78dD254064F42C1B9dd9205731A';
const LOCKER_ADDRESS = '0xF6BFeFAdD008FBF7F5F3b54E3ec5d1403967ac8f';

const propId =
  '6710164757546047754297806568396090581956979312861437213151479767075350705109';

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = Governance.attach(GOVERNANCE_ADDRESS);

  const Locker = await hre.ethers.getContractFactory('Locker');
  const locker = Locker.attach(LOCKER_ADDRESS);

  const executePropose = await governance.execute(
    [LOCKER_ADDRESS],
    [0],
    [
      locker.interface.encodeFunctionData('withdrawFunds', [
        proposer.address,
        ethers.utils.parseUnits('1', 18),
      ]),
    ],
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Donation Demo'))
  );

  await executePropose.wait();
  //   console.log(executePropose);

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
