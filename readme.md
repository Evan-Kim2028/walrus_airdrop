# Walrus Airdrop Processor

## Setup
To add the walrus airdrop contract to your sentio project, run the following command:
`yarn sentio add --chain sui_mainnet 0x98af8b8fde88f3c4bdf0fcedcf9afee7d10f66d480b74fb5a3a2e23dc7f5a564 `

## Processor
The `WALAirdropProcessor` is initialized to process objects of type `WALAirdrop` from the specified contract, extracting the static fields of the object which contain the airdrop allocation amounts.

## 
To run the processor, run the following command:
`yarn sentio install` and then `yarn sentio upload` to send to the Sentio processor project, 


