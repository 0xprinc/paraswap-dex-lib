import { BI_POWS } from '../../bigint-constants';
import { StatefulEventSubscriber } from '../../stateful-event-subscriber';
import { Interface } from '@ethersproject/abi';

import type { IDexHelper } from '../../dex-helper';
import type { AsyncOrSync, DeepReadonly } from 'ts-essentials';
import type { Address, BlockHeader, Log, Logger } from '../../types';
import type { SparkSDaiPoolState } from './types';
import { getOnChainState } from './utils';

const RAY = BI_POWS[27];
const ZERO = BigInt(0);
const TWO = BigInt(2);
const HALF = RAY / TWO;

// function file(bytes32,uint256)
const FILE_TOPICHASH = `0x29ae811400000000000000000000000000000000000000000000000000000000`;
// function drip()
const DRIP_TOPICHASH = `0x9f678cca00000000000000000000000000000000000000000000000000000000`;
// function cage()
const CAGE_TOPICHASH = `0x6924500900000000000000000000000000000000000000000000000000000000`;
// bytes32 repr of "dsr" string
const DSR_TOPIC = `0x6473720000000000000000000000000000000000000000000000000000000000`;

const rpow = (x: bigint, n: bigint): bigint => {
  if (!x && !n) return RAY;
  if (!x) return ZERO;

  let z = n % TWO > ZERO ? x : RAY;

  for (n = n / TWO; n; n /= TWO) {
    x = (x * x + HALF) / RAY;
    if (n % TWO > ZERO) {
      z = (z * x + HALF) / RAY;
    }
  }

  return z;
};

const calcChi = (state: SparkSDaiPoolState, currentTimestamp?: number) => {
  currentTimestamp ||= Math.floor(Date.now() / 1000);
  if (!state.live) return RAY;

  const { dsr: dsr_, chi: chi_, rho: rho_ } = state;
  const now = BigInt(currentTimestamp);
  const rho = BigInt(rho_);
  const dsr = BigInt(dsr_);
  const chi = BigInt(chi_);

  return now > rho ? (rpow(dsr, now - rho) * chi) / RAY : chi;
};

export class SparkSDaiEventPool extends StatefulEventSubscriber<SparkSDaiPoolState> {
  constructor(
    parentName: string,
    poolName: string,
    protected dexHelper: IDexHelper,
    private potAddress: Address,
    private potInterface: Interface,
    logger: Logger,
  ) {
    super(parentName, poolName, dexHelper, logger);
    this.addressesSubscribed = [potAddress];
  }

  protected processLog(
    state: DeepReadonly<SparkSDaiPoolState>,
    log: Readonly<Log>,
    blockHeader: Readonly<BlockHeader>,
  ): AsyncOrSync<DeepReadonly<SparkSDaiPoolState> | null> {
    if (log.topics[0] === FILE_TOPICHASH && log.topics[2] === DSR_TOPIC) {
      return {
        ...state,
        dsr: BigInt(log.topics[3]).toString(),
      };
    }

    if (log.topics[0] === DRIP_TOPICHASH) {
      return {
        ...state,
        rho: blockHeader.timestamp.toString(),
        chi: calcChi(state, +blockHeader.timestamp).toString(),
      };
    }

    return null;
  }

  async generateState(
    blockNumber: number | 'latest' = 'latest',
  ): Promise<DeepReadonly<SparkSDaiPoolState>> {
    return getOnChainState(
      this.dexHelper.multiContract,
      this.potAddress,
      this.potInterface,
      blockNumber,
    );
  }

  convertToSDai(daiAmount: bigint, blockNumber: number): bigint {
    const state = this.getState(blockNumber);
    if (!state) throw new Error(`SDai state at ${blockNumber} does not exists`);

    return (daiAmount * RAY) / calcChi(state);
  }

  convertToDai(sdaiAmount: bigint, blockNumber: number): bigint {
    const state = this.getState(blockNumber);
    if (!state) throw new Error(`SDai state at ${blockNumber} does not exists`);

    return (sdaiAmount * calcChi(state)) / RAY;
  }
}
