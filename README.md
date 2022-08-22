# Governance and WMDB DAO

## About

This repo contains the smart contracts created for WMDB DAO that that govern the databse contract.

# Getting Started

Hardhat: [hardhat getting started documentation](https://hardhat.org/getting-started/).

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

### Installation

1. Clone this repo:

```
git clone https://github.com/Abhijith002/WMDB
cd WMDB
```

2. Install dependencies

```sh
yarn
```

### On-Chain Governance

Tasks.

1. Deploy WMDB token (ERC20) token that we will use to govern the DAO.
2. Deploy a Timelock contract that will give a buffer between executing proposals.
   1. Note: **The timelock is the contract that will handle all the money, ownerships, etc**
3. Deploy our WMDB Governence contract
   1. Note: **The Governance contract is in charge of proposals and such, but the Timelock executes!**
4. Deploy the WMDB contract, which will be owned by our governance process! (aka, timelock contract).
5. Users can propose a new addition to the WMDB contract.
6. DAO members vote on that proposal.
7. DAO members queue the proposal to be executed.
8. Finally the proposal is executed!

Running locally:

1. Setup local blockchain

```
yarn hardhat node
```

2. Propose a new value to be added to WMDB contract

In a second terminal (leave your blockchain running)

```
yarn hardhat run scripts/propose.ts --network localhost
```

3. Vote on that proposal

```
yarn hardhat run scripts/vote.ts --network localhost
```

4. Queue & Execute proposal!

```
yarn hardhat run scripts/queue-and-execute.ts --network localhost
```

## Contact

Abhijith - [@AbhijithGowdar](https://twitter.com/AbhijithGowdar)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Openzeppelin Governance Walkthrough](https://docs.openzeppelin.com/contracts/4.x/governance)
- [Openzeppelin Governance Github](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance)
- [Patrick Collins Github](https://github.com/PatrickAlphaC/dao-template)
