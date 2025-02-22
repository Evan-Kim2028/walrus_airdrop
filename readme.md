# Walrus Airdrop Processor

## Setup

First, make a new sentio project. Clone the repository and then login with the command:
`npx @sentio/cli login --api-key 123`

Install sentio with `yarn add @sentio/sdk`. 

To compile the processor locally, run 
`yarn sentio build`. Once the processor is ready to upload, use `yarn sentio upload` to upload to the Sentio project. The project name in Sentio needs to match the project name defined in `sentio.yaml`. Currently it's set as `walrus_airdrop`. 

To add the walrus airdrop contract to your sentio project, run the following command:
`yarn sentio add --chain sui_mainnet 0x98af8b8fde88f3c4bdf0fcedcf9afee7d10f66d480b74fb5a3a2e23dc7f5a564 `

## Processor
The `WALAirdropProcessor` is initialized to process objects of type `WALAirdrop` from the specified contract, extracting the static fields of the object which contain the airdrop allocation amounts.


