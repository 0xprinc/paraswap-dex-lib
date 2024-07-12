/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

import { Interface, Result } from '@ethersproject/abi';
import { DummyDexHelper } from '../../dex-helper/index';
import { Network, SwapSide } from '../../constants';
import { BI_POWS } from '../../bigint-constants';
import { MaverickV2 } from './maverick-v2';
import {
  checkPoolPrices,
  checkPoolsLiquidity,
  checkConstantPoolPrices,
} from '../../../tests/utils';
import { Tokens } from '../../../tests/constants-e2e';
import { MaverickV2Data } from './types';
import { ExchangePrices, PoolPrices } from '../../types';
import MaverickV2QuoterABI from '../../abi/maverick-v2/MaverickV2Quoter.json';
import { MaverickV2Config } from './config';
import { AbiItem } from 'web3-utils';

/*
  README
  ======

  This test script adds tests for MaverickV2 general integration
  with the DEX interface. The test cases below are example tests.
  It is recommended to add tests which cover MaverickV2 specific
  logic.

  You can run this individual test script by running:
  `npx jest src/dex/<dex-name>/<dex-name>-integration.test.ts`

  (This comment should be removed from the final implementation)
*/

const network = Network.BASE;
const dexKey = 'MaverickV2';
const dexHelper = new DummyDexHelper(network);

function calculateSwap(
  network: Network,
  pool: PoolPrices<MaverickV2Data>,
  blockNumber: number,
  poolAddress: string,
  srcToken: string,
  side: SwapSide,
  amount: bigint,
) {
  srcToken = dexHelper.config.wrapETH(srcToken);

  let quoterContract = new dexHelper.web3Provider.eth.Contract(
    MaverickV2QuoterABI as AbiItem[],
    MaverickV2Config[dexKey][network].quoterAddress,
  );

  return new Promise((resolve, reject) => {
    quoterContract.methods
      .calculateSwap(
        poolAddress,
        amount,
        pool.data.tokenA.toLowerCase() === srcToken.toLowerCase(),
        side === SwapSide.BUY,
        pool.data.tokenA.toLowerCase() === srcToken.toLowerCase()
          ? 1000000n
          : -1000000n,
      )
      .call({}, blockNumber, (err: any, result: any) => {
        if (err) {
          console.log({
            pool,
            blockNumber,
            poolAddress,
            srcToken,
            side,
            amount,
          });
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
}

async function checkOnChainPricing(
  maverickV2: MaverickV2,
  funcName: string,
  blockNumber: number,
  pools: ExchangePrices<MaverickV2Data>,
  amounts: bigint[],
  side: SwapSide,
  srcToken: string,
) {
  await Promise.all(
    pools.map(async pool => {
      const poolAddress = pool.data.pool;
      const calls = amounts.slice(1).map(amount => {
        return calculateSwap(
          network,
          pool,
          blockNumber,
          poolAddress,
          srcToken,
          side,
          amount,
        );
      });

      const results = await Promise.all(calls);

      const expectedPrices = [0n].concat(
        results.map((result: any) => {
          if (!result) return BigInt(0);

          return BigInt(
            side === SwapSide.SELL ? result.amountOut : result.amountIn,
          );
        }),
      );

      expect(pool.prices).toEqual(expectedPrices);
    }),
  );
}

async function testPricingOnNetwork(
  maverickV2: MaverickV2,
  network: Network,
  dexKey: string,
  blockNumber: number,
  srcTokenSymbol: string,
  destTokenSymbol: string,
  side: SwapSide,
  amounts: bigint[],
  funcNameToCheck: string,
) {
  const networkTokens = Tokens[network];
  const pools = await maverickV2.getPoolIdentifiers(
    networkTokens[srcTokenSymbol],
    networkTokens[destTokenSymbol],
    side,
    blockNumber,
  );
  console.log(
    `${srcTokenSymbol} <> ${destTokenSymbol} Pool Identifiers: `,
    pools,
  );

  expect(pools.length).toBeGreaterThan(0);

  const poolPrices = await maverickV2.getPricesVolume(
    networkTokens[srcTokenSymbol],
    networkTokens[destTokenSymbol],
    amounts,
    side,
    blockNumber,
    pools,
  );
  console.log(
    `${srcTokenSymbol} <> ${destTokenSymbol} Pool Prices: `,
    poolPrices,
  );

  expect(poolPrices).not.toBeNull();
  if (maverickV2.hasConstantPriceLargeAmounts) {
    checkConstantPoolPrices(poolPrices!, amounts, dexKey);
  } else {
    checkPoolPrices(poolPrices!, amounts, side, dexKey);
  }

  // Check if onchain pricing equals to calculated ones
  await checkOnChainPricing(
    maverickV2,
    funcNameToCheck,
    blockNumber,
    poolPrices!,
    amounts,
    side,
    Tokens[network][srcTokenSymbol].address,
  );
}

describe('MaverickV2', function () {
  const dexKey = 'MaverickV2';
  let blockNumber: number;
  let maverickV2: MaverickV2;
  const network = Network.BASE;

  describe(network, () => {
    const dexHelper = new DummyDexHelper(network);

    const tokens = Tokens[network];

    const srcTokenSymbol = 'ETH';
    const destTokenSymbol = 'USDC';

    const srcDecimals = tokens[srcTokenSymbol].decimals;
    const destDecimals = tokens[destTokenSymbol].decimals;

    const amountsForSell = [
      0n,
      1n * BI_POWS[srcDecimals],
      2n * BI_POWS[srcDecimals],
      3n * BI_POWS[srcDecimals],
      4n * BI_POWS[srcDecimals],
      5n * BI_POWS[srcDecimals],
      6n * BI_POWS[srcDecimals],
      7n * BI_POWS[srcDecimals],
      8n * BI_POWS[srcDecimals],
      // 9n * BI_POWS[srcDecimals],
      // 10n * BI_POWS[srcDecimals],
    ];

    const amountsForBuy = [
      0n,
      1n * BI_POWS[destDecimals],
      2n * BI_POWS[destDecimals],
      3n * BI_POWS[destDecimals],
      4n * BI_POWS[destDecimals],
      5n * BI_POWS[destDecimals],
      6n * BI_POWS[destDecimals],
      7n * BI_POWS[destDecimals],
      8n * BI_POWS[destDecimals],
      // 9n * BI_POWS[destDecimals],
      // 10n * BI_POWS[destDecimals],
    ];

    beforeAll(async () => {
      blockNumber = await dexHelper.web3Provider.eth.getBlockNumber();
      maverickV2 = new MaverickV2(network, dexKey, dexHelper);
      await maverickV2.initializePricing(blockNumber);
    });

    it('getPoolIdentifiers and getPricesVolume SELL', async function () {
      await testPricingOnNetwork(
        maverickV2,
        network,
        dexKey,
        blockNumber,
        srcTokenSymbol,
        destTokenSymbol,
        SwapSide.SELL,
        amountsForSell,
        'calculatePrice',
      );
    });

    // it('getPoolIdentifiers and getPricesVolume BUY', async function () {
    //   await testPricingOnNetwork(
    //     maverickV2,
    //     network,
    //     dexKey,
    //     blockNumber,
    //     srcTokenSymbol,
    //     destTokenSymbol,
    //     SwapSide.BUY,
    //     amountsForBuy,
    //     'calculatePrice',
    //   );
    // });

    it('getTopPoolsForToken', async function () {
      const newMaverickV2 = new MaverickV2(network, dexKey, dexHelper);
      if (newMaverickV2.updatePoolState) {
        await newMaverickV2.updatePoolState();
      }
      const poolLiquidity = await newMaverickV2.getTopPoolsForToken(
        tokens[srcTokenSymbol].address,
        10,
      );
      console.log(`${srcTokenSymbol} Top Pools:`, poolLiquidity);

      if (!newMaverickV2.hasConstantPriceLargeAmounts) {
        checkPoolsLiquidity(
          poolLiquidity,
          tokens[srcTokenSymbol].address,
          dexKey,
        );
      }
    });
  });
});
