import { airdrop } from './types/sui/0x98af8b8fde88f3c4bdf0fcedcf9afee7d10f66d480b74fb5a3a2e23dc7f5a564.js'
import { SuiObjectTypeProcessor } from "@sentio/sdk/sui"


export function initWALAirdropProcessor() {
  SuiObjectTypeProcessor.bind({
    // Specify the object type to track (WALAirdrop)
    objectType: airdrop.WALAirdrop.type(),
    // Set the starting checkpoint for processing
    startCheckpoint: 114180816n
  })
    .onTimeInterval(async (self, _, ctx) => {
      // Log the static fields of the WALAirdrop object into Sentio event table `WALAirdrop_objects`
      await ctx.eventLogger.emit('WALAirdrop_objects', {
        id: self.data_decoded.id.id,
        initial_allocation: Number(self.data_decoded.initial_allocation) / 10 ** 9, // WAL Decimal conversion
        allocation_withdrawn: self.data_decoded.allocation_withdrawn,
        locked_id: self.data_decoded.locked_id
      })
    })
}

initWALAirdropProcessor()