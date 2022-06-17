# DAO-Smart-Contract

DAO Smart Contract for donation were you can propose the then propose pass and everyone will be given token to vote. If it success then the address we have provide ether will deposit.

-There are four Contract.

- Nappy Token
- TimeLock
- Governance
- Locker

## Nappy Token

- Token Name: Nappy Token
- Token Symbol: NPY
- Nappy Token will use to mint token and transfer to voter for use in voting.
- First owner will mint the token. There is no fixed supply to mint the token.
- This contract will also use for delegate the tokens. User will have to call delegate() function for voting power.

## TimeLock

- This contract will set as owner of the Locker contract.

- It will decide how many block's to wait to execute proposal.

## Governance

- This contract will create the proposal and vote for the same.
- In this contact user can create the proposal, vote, cancel.
- There are several stages for proposal.

#### Stages

| Sr No | Stages      |
| :---- | :---------- |
| `0`   | `Pending`   |
| `1`   | `Active`    |
| `2`   | `Cancelled` |
| `3`   | `Defeated`  |
| `4`   | `Succeeded` |
| `5`   | `Queued`    |
| `6`   | `Expired`   |
| `7`   | `Executed`  |

- First of all we will deploy the contract. We will get contract address of all deploy contract.

```bash
  npx hardhat run scripts/deploy.js --network ropsten
```

- `Nappy Token` : `0xb1E2d34eE670F4B91C8015547D4E1F1f89a61f92`
- `TimeLock` : `0x8fC26556DfCD22cCEa0478feb67B29Aa0363D1B4`
- `Governance` : `0x032BA118F762c78dD254064F42C1B9dd9205731A`
- `Locker` : `0xF6BFeFAdD008FBF7F5F3b54E3ec5d1403967ac8f`

- After this we will call proposal contract.

```bash
  npx hardhat run scripts/proposal.js --network ropsten
```

- After this function we will get proposal Id.

- `Proposal Id` : `6710164757546047754297806568396090581956979312861437213151479767075350705109`

- Now we will check state of the DAO.

- Before check the state we have to wait for to mine 20 Blocks.

```bash
  npx hardhat run scripts/state.js --network ropsten
```

- It will give state `1` means our proposal is `Active`.

- Now everyone will vote using castVote function.

```bash
  npx hardhat run scripts/voting.js --network ropsten
```

- Now we will check state of the DAO.

```bash
  npx hardhat run scripts/state.js --network ropsten
```

- It will give state `4` means our proposal is `Succeeded`.

- The voting is Succeeded.

- Now we will call the `queue` function our proposal is pass.

```bash
  npx hardhat run scripts/state.js --network ropsten
```

- It will give state `5` means our proposal is `Queued`.

- Now our proposal is in Queue.

- Now we will Execute the proposal.

```bash
  npx hardhat run scripts/execute.js --network ropsten
```

- It will give state `7` means our proposal is `Executed`.

- Our proposal is successfully executed.

#### Get item

## Locker

- This contract will store the ether. Anyone can send the ether to this contract.
- Only owner can withdraw the funds.
- It transfer ownership to `TimeLock` Contract using `transferOwnership` function.

## Important Step

```bash
create .env file in root directory.
```

```bash
    API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY = "YOUR-METAMASK-PRIVATE_KEY"
    ETHERSCAN_API_KEY = "YOUR-ETHERSCAN_API_KEY"

```

-Get Your API Key

- [Alchemy](https://alchemy.com/?r=36af7883c4699196)

-Get Your Ropsten Faucet

- [Ropsten Faucet](https://faucet.egorfine.com/)

## NPM Packages

- [Openzeppelin](https://www.npmjs.com/package/@openzeppelin/contracts)
- [Hardhat-Ethers](https://www.npmjs.com/package/hardhat-ethers)
- [Chai](https://www.npmjs.com/package/chai)
- [Ethers](https://www.npmjs.com/package/ethers)
- [Ethereum-Waffle](https://www.npmjs.com/package/ethereum-waffle)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Hardhat-Etherscan](https://www.npmjs.com/package/@nomiclabs/hardhat-etherscan)

## Tech Stack

- [Node](https://nodejs.org/en/)
- [Hardhat](https://hardhat.org/)
- [Solidity](https://docs.soliditylang.org/)
- [Openzeppelin](https://openzeppelin.com/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/karangorania/dao-smart-contract
```

Go to the project directory

```bash
  cd dao-smart-contract
```

Install dependencies

```bash
  npm install
```

Compile

```bash
  npx hardhat compile
```

Test

```bash
  npx hardhat test
```

Deploy

```bash
  node scripts/deploy.js
```

Deploy on Rinkeby

```bash
  npx hardhat run scripts/deploy.js --network ropsten
```

Verify Contract

```bash
npx hardhat verify --network rinkeby <YOUR_CONTRACT_ADDRESS>
```

Help

```bash
  npx hardhat help
```

# Check on Ropsten Explorer

## Deploy Contract

- [NappyToken](https://ropsten.etherscan.io/address/0xb1E2d34eE670F4B91C8015547D4E1F1f89a61f92)
- [TimeLock](https://ropsten.etherscan.io/address/0x8fC26556DfCD22cCEa0478feb67B29Aa0363D1B4)
- [Governance](https://ropsten.etherscan.io/address/0x032BA118F762c78dD254064F42C1B9dd9205731A)
- [Locker](https://ropsten.etherscan.io/address/0xF6BFeFAdD008FBF7F5F3b54E3ec5d1403967ac8f)

# Transaction

## Proposal ID

- [Proposal ID](6710164757546047754297806568396090581956979312861437213151479767075350705109)

- [WithdrawETH](https://ropsten.etherscan.io/tx/0x6b6a5a79e0c5573faa3d2095afccb70e0644c0664041fc2b8e8c1814767433c2)
