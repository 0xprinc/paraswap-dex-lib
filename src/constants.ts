import { BigNumber } from 'ethers';

export { SwapSide, ContractMethod } from '@paraswap/core';

export const PORT_TEST_SERVER = process.env.TEST_PORT;

export const ETHER_ADDRESS =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase();

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export const CACHE_PREFIX = 'dl';

export const MAX_UINT =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const MAX_INT =
  '57896044618658097711785492504343953926634992332820282019728792003956564819967';
export const MIN_INT =
  '-57896044618658097711785492504343953926634992332820282019728792003956564819967';

export const MAX_BLOCKS_HISTORY = 7;

export const SETUP_RETRY_TIMEOUT = 20 * 1000; // 20s

// TODO: Undo
export const FETCH_POOL_IDENTIFIER_TIMEOUT = 100 * 1000; // 1s
export const FETCH_POOL_PRICES_TIMEOUT = 3 * 1000; // 3s

// How frequently logs wil be printed
export const STATEFUL_EVENT_SUBSCRIBER_LOG_BATCH_PERIOD = 60 * 1000;

export enum Network {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  BSC = 56,
  POLYGON = 137,
  ZKEVM = 1101,
  AVALANCHE = 43114,
  FANTOM = 250,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  BASE = 8453,
}
export const SUBGRAPH_TIMEOUT = 20 * 1000;

export enum LIMIT_ORDER_PROVIDERS {
  PARASWAP = 'ParaSwapLimitOrderProvider',
}

// transfer User -> Augustus
export const SRC_TOKEN_PARASWAP_TRANSFERS = 1;
// Transfer Augustus -> Dex
export const SRC_TOKEN_DEX_TRANSFERS = 1;

// transfer Augustus -> User
export const DEST_TOKEN_PARASWAP_TRANSFERS = 1;
// transfer Dex -> Augustus
export const DEST_TOKEN_DEX_TRANSFERS = 1;

export const BPS_MAX_VALUE = 10000n;

export const FEE_PERCENT_IN_BASIS_POINTS_MASK = BigNumber.from('0x3FFF');
export const IS_CAP_SURPLUS_MASK = BigNumber.from('1').shl(92);
export const IS_SKIP_BLACKLIST_MASK = BigNumber.from('1').shl(93);
export const IS_REFERRAL_MASK = BigNumber.from('1').shl(94);
export const IS_TAKE_SURPLUS_MASK = BigNumber.from('1').shl(95);
