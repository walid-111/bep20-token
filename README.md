# Token42 — 42 School Tokenizer Project

## Contract

- **Network**: BNB Smart Chain Testnet (Chain ID: 97)
- **Contract Address**: 0x50d5d36643730972080Ed6B0CCa4ed70B9078D0B
- **Explorer**: https://testnet.bscscan.com/address/0x50d5d36643730972080Ed6B0CCa4ed70B9078D0B

## Token Details

Name : Token42
Symbol : TK42
Decimals : 18
Initial Supply : 1,000,000 TK42
Standard : BEP-20

## Design Choices

### Why BNB Smart Chain?
Project is a partnership with BNB Chain + BSC is EVM-compatible, 
meaning it uses the same language as Ethereum (Solidity).

### Why BEP-20?
it's the token standard on BSC (like ERC-20 on Ethereum), ensure compatibility with different tools (wallets, explorers..).

### Why Solidity 0.8.20?
Since version 0.8.0, Solidity includes automatic overflow/underflow protection.

### Why Hardhat?
Hardhat is the most actively maintained Ethereum development framework (lets us write tests in js too)

## Repository Structure

```
.
-> README.md
-> code/
   -> Token42.sol        <- BEP-20 smart contract
-> deployment/
   -> contracts/         <- copy of contract for Hardhat
   -> test/
      -> Token42.test.js <- 14 automated tests
   -> hardhat.config.js  <- framework config
   -> deploy.js          <- deployment script
   -> package.json       <- dependencies
-> documentation/
   -> DOCUMENTATION.md   <- technical doc
```

## How to Deploy

```bash
cd deployment
npm install
cp .env.example .env
npx hardhat test
npx hardhat run deploy.js --network bscTestnet
```