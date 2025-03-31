import {events, staking_pool} from "./types/sui/walrus_mainnet.js";
import { SuiObjectTypeProcessor } from "@sentio/sdk/sui";

// blobs
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


export function initWalMainnetStakingProcessor() {
    SuiObjectTypeProcessor.bind({
      objectType: staking_pool.StakingPool.type(),
      startCheckpoint: 122519926n
    })
    .onTimeInterval(async (self, _, ctx) => {
      // retrieves the walrus airdrop object fields
      await ctx.eventLogger.emit('staking_pool_obj', {
        id: self.data_decoded.id.id,
        state: self.data_decoded.state,
        voting_params: self.data_decoded.voting_params,
        node_info: self.data_decoded.node_info,
        activation_epoch: self.data_decoded.activation_epoch,
        latest_epoch: self.data_decoded.latest_epoch,
        wal_balance: Number(self.data_decoded.wal_balance) / 10**9,
        num_shares: Number(self.data_decoded.num_shares),
        pending_shares_withdraw: self.data_decoded.pending_shares_withdraw,
        pre_active_withdrawals: self.data_decoded.pre_active_withdrawals,
        pending_commission_rate: self.data_decoded.pending_commission_rate,
        commission_rate: self.data_decoded.commission_rate,
        exchange_rates: self.data_decoded.exchange_rates,
        pending_stake: self.data_decoded.pending_stake,
        rewards_pool: self.data_decoded.rewards_pool,
        // commission: self.data_decoded.commission,
        // commission_receiver: self.data_decoded.commission_receiver,
        // governance_authorized: self.data_decoded.governance_authorized,
        extra_fields: self.data_decoded.extra_fields,
      })
    })
  } 