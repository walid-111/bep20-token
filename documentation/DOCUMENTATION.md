# Token42 — Documentation

## What is Token42?

Token42 (TK42) is a token deployed on BNB Smart Chain Testnet as part of the 42 school Tokenizer project.
A token is a program living on a blockchain that tracks who owns what numbers.

## Token Details

Name : Token42 
Symbol : TK42 
Standard : BEP-20 
Decimals : 18 
Initial Supply : 1,000,000 TK42 
Network : BNB Smart Chain Testnet (Chain ID: 97) 
Contract Address : 0x50d5d36643730972080Ed6B0CCa4ed70B9078D0B 
Explorer : https://testnet.bscscan.com/address/0x50d5d36643730972080Ed6B0CCa4ed70B9078D0B 

## How it works

When the contract is deployed:
- 1,000,000 TK42 are created and sent to the deployer's wallet
- The contract lives permanently at its address on the blockchain
- Nobody can shut it down or modify it

## What you can do with TK42

### Send tokens
Call `transfer(recipient, amount)` to send TK42 to any address.

### Approve a spender
Call `approve(spender, amount)` to authorize another address (or contract) to spend up to `amount` of your tokens on your behalf.

### Transfer on behalf
Call `transferFrom(sender, recipient, amount)` to spend tokens you have been approved to use.

### Burn tokens
Call `burn(amount)` to permanently destroy your own tokens.

### Mint tokens (owner only)
Call `mint(address, amount)` to create new tokens.

## Decimals explained

TK42 uses 18 decimal places (like BNB/ETH) to avoid floating point errors.
This means 1 TK42 is stored internally as:
1,000,000,000,000,000,000 (10^18 base units)

## External and Internal functions explained

- External functions can be called from outside the contract (e.g. by users or other contracts) and are part of the public API.
- Internal functions can only be called from within the contract itself and are used for code organization and reuse. They are not accessible from outside.
What we do is we re-implement the internal `_transfer` function to add our custom logic (like blocking transfers to address(0)) while still using the standard ERC20 transfer mechanism.

## Security

- `mint()` is restricted to the owner via `onlyOwner`
- Transfers to/from `address(0)` are blocked
- All balances are checked before transfers
- Solidity 0.8.20 includes automatic overflow protection
- The owner can renounce ownership permanently via `renounceOwnership()`

## How to add TK42 to MetaMask

1. Open MetaMask : switch to BNB Smart Chain Testnet
2. Click "Import tokens"
3. Paste the contract address: `0x50d5d36643730972080Ed6B0CCa4ed70B9078D0B`
4. Symbol and decimals fill in automatically
5. Click "Add custom token"

## How to interact via BSCScan

1. Go to the contract on BSCScan testnet
2. Click the "Contract" tab
3. Click "Write Contract" -> connect MetaMask
4. Call any function directly from the browser
5. Click "Read Contract" for free read-only calls

## How to run locally

```bash
cd deployment
npm install
npx hardhat test
```

## Project structure
tokenizer42/
├── README.md
├── code/
│   └── Token42.sol
├── deployment/
│   ├── hardhat.config.js
│   ├── deploy.js
│   ├── test/
│   │   └── Token42.test.js
│   └── package.json
└── documentation/
└── DOCUMENTATION.md