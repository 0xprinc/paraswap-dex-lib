import { DexParams, ImplementationNames } from '../curve-v1-factory/types';
import { DexConfigMap, AdapterMappings } from '../../types';
import { Network, SwapSide } from '../../constants';
import { configAddressesNormalizer } from '../curve-v1-factory/config';

// stable ng factories addresses are taken from https://github.com/curvefi/curve-api/blob/main/constants/configs/configs.js
const CurveV1StableNgConfig: DexConfigMap<DexParams> = {
  CurveV1StableNg: {
    [Network.MAINNET]: {
      factories: [
        {
          address: '0x6A8cbed756804B16E05E741eDaBd5cB544AE21bf',
          isStableNg: true,
        },
      ],
      stateUpdatePeriodMs: 5 * 1000,
      disabledPools: new Set([]),
      disabledImplementations: new Set([]),
      factoryPoolImplementations: {
        '0xdcc91f930b42619377c200ba05b7513f2958b202': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xdcc91f930b42619377c200ba05b7513f2958b202',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0x933f4769dcc27fc7345d9d5975ae48ec4d0f829c': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0x933f4769dcc27fc7345d9d5975ae48ec4d0f829c',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0xede71f77d7c900dca5892720e76316c6e575f0f7': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xede71f77d7c900dca5892720e76316c6e575f0f7',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0xdd7ebb1c49780519dd9755b8b1a23a6f42ce099e': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xdd7ebb1c49780519dd9755b8b1a23a6f42ce099e',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0x3e3b5f27bbf5cc967e074b70e9f4046e31663181': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0x3e3b5f27bbf5cc967e074b70e9f4046e31663181',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0x64afa95e0c3d8410240a4262df9fd82b12b64edd': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0x64afa95e0c3d8410240a4262df9fd82b12b64edd',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0x1f7c86affe5bcf7a1d74a8c8e2ef9e03bf31c1bd': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0x1f7c86affe5bcf7a1d74a8c8e2ef9e03bf31c1bd',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
      },
      customPools: {},
    },
    [Network.POLYGON]: {
      factories: [
        {
          address: '0x1764ee18e8B3ccA4787249Ceb249356192594585',
          isStableNg: true,
        },
      ],
      stateUpdatePeriodMs: 2 * 1000,
      disabledPools: new Set([]),
      disabledImplementations: new Set([]),
      factoryPoolImplementations: {
        '0xe265fc390e9129b7e337da23cd42e00c34da2ce3': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xe265fc390e9129b7e337da23cd42e00c34da2ce3',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0xa7ba18eefcd9513230987ec2fab6711af5abd9c2': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xa7ba18eefcd9513230987ec2fab6711af5abd9c2',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
      },
      customPools: {},
    },
    [Network.FANTOM]: {
      factories: [
        {
          address: '0xe61Fb97Ef6eBFBa12B36Ffd7be785c1F5A2DE66b',
          isStableNg: true,
        },
      ],
      stateUpdatePeriodMs: 2 * 1000,
      disabledPools: new Set([]),
      disabledImplementations: new Set([]),
      factoryPoolImplementations: {
        '0x5702bdb1ec244704e3cbbaae11a0275ae5b07499': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0x5702bdb1ec244704e3cbbaae11a0275ae5b07499',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
      },
      customPools: {},
    },
    [Network.ARBITRUM]: {
      factories: [
        {
          address: '0x9AF14D26075f142eb3F292D5065EB3faa646167b',
          isStableNg: true,
        },
      ],
      stateUpdatePeriodMs: 2 * 1000,
      disabledPools: new Set([]),
      disabledImplementations: new Set([]),
      factoryPoolImplementations: {
        '0xf6841c27fe35ed7069189afd5b81513578afd7ff': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xf6841c27fe35ed7069189afd5b81513578afd7ff',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
        '0xff02cbd91f57a778bab7218da562594a680b8b61': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xff02cbd91f57a778bab7218da562594a680b8b61',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
      },
      customPools: {},
    },
    [Network.OPTIMISM]: {
      factories: [
        {
          address: '0x5eeE3091f747E60a045a2E715a4c71e600e31F6E',
          isStableNg: true,
        },
      ],
      stateUpdatePeriodMs: 2 * 1000,
      disabledPools: new Set([]),
      disabledImplementations: new Set([]),
      factoryPoolImplementations: {
        '0x635742dcc8313dcf8c904206037d962c042eafbd': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0x635742dcc8313dcf8c904206037d962c042eafbd',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
      },
      customPools: {},
    },
    [Network.BASE]: {
      factories: [
        {
          address: '0xd2002373543Ce3527023C75e7518C274A51ce712',
          isStableNg: true,
        },
      ],
      stateUpdatePeriodMs: 2 * 1000,
      disabledPools: new Set([]),
      disabledImplementations: new Set([]),
      factoryPoolImplementations: {
        '0xf3A6aa40cf048a3960E9664847E9a7be025a390a': {
          name: ImplementationNames.FACTORY_STABLE_NG,
          address: '0xf3A6aa40cf048a3960E9664847E9a7be025a390a',
          liquidityApiSlug: '/factory-stable-ng',
          isStoreRateSupported: true,
        },
      },
      customPools: {},
    },
  },
};

export const Adapters: Record<number, AdapterMappings> = {
  [Network.MAINNET]: {
    [SwapSide.SELL]: [
      {
        name: 'Adapter01',
        index: 3,
      },
    ],
    [SwapSide.BUY]: [
      {
        name: 'BuyAdapter02',
        index: 5,
      },
    ],
  },
  [Network.POLYGON]: {
    [SwapSide.SELL]: [
      {
        name: 'PolygonAdapter01',
        index: 3,
      },
    ],
    [SwapSide.BUY]: [
      {
        name: 'PolygonBuyAdapter',
        index: 10,
      },
    ],
  },
  [Network.FANTOM]: {
    [SwapSide.SELL]: [
      {
        name: 'FantomAdapter01',
        index: 3,
      },
    ],
    [SwapSide.BUY]: [
      {
        name: 'FantomBuyAdapter',
        index: 6,
      },
    ],
  },
  [Network.ARBITRUM]: {
    [SwapSide.SELL]: [
      {
        name: 'ArbitrumAdapter01',
        index: 6,
      },
    ],
    [SwapSide.BUY]: [
      {
        name: 'ArbitrumBuyAdapter',
        index: 12,
      },
    ],
  },
  [Network.OPTIMISM]: {
    [SwapSide.SELL]: [
      {
        name: 'OptimismAdapter01',
        index: 5,
      },
    ],
    [SwapSide.BUY]: [
      {
        name: 'OptimismBuyAdapter',
        index: 8,
      },
    ],
  },
  [Network.BASE]: {
    [SwapSide.SELL]: [
      {
        name: 'BaseAdapter02',
        index: 3,
      },
    ],
    [SwapSide.BUY]: [
      {
        name: 'BaseBuyAdapter',
        index: 9,
      },
    ],
  },
};

configAddressesNormalizer(CurveV1StableNgConfig);

export { CurveV1StableNgConfig };
