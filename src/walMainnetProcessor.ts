import {events} from "./types/sui/walrus_mainnet.js";
// import { SuiObjectTypeProcessor } from "@sentio/sdk/sui";

export function initWALMainnetEventsProcessor() {
    events.bind({
  })
  .onEventBlobCertified(async (self, ctx) => {
    await ctx.eventLogger.emit('blob_certified', {
        epoch: Number(self.data_decoded.epoch),
        blob_id: Number(self.data_decoded.blob_id),
        end_epoch: Number(self.data_decoded.end_epoch),
        deletable: Boolean(self.data_decoded.deletable),
        object_id: self.data_decoded.object_id,
        is_extension: Boolean(self.data_decoded.is_extension),
    })
  })
  .onEventBlobRegistered(async (self, ctx) => {
    await ctx.eventLogger.emit('blob_registered', {
        epoch: Number(self.data_decoded.epoch),
        blob_id: Number(self.data_decoded.blob_id),
        size_mb: Number(self.data_decoded.size) / 1e6,
        encoding_type: Number(self.data_decoded.encoding_type),
        end_epoch: Number(self.data_decoded.end_epoch),
        deletable: Boolean(self.data_decoded.deletable),
        object_id: self.data_decoded.object_id,
    })
  })
  .onEventBlobDeleted(async (self, ctx) => {
    await ctx.eventLogger.emit('blob_deleted', {
        epoch: Number(self.data_decoded.epoch),
        blob_id: Number(self.data_decoded.blob_id),
        end_epoch: Number(self.data_decoded.end_epoch),
        object_id: self.data_decoded.object_id,
        was_certified: Boolean(self.data_decoded.was_certified),
    })
  })

}