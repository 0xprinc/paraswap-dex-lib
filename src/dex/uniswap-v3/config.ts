import { DexParams } from './types';
import { DexConfigMap, AdapterMappings } from '../../types';
import { Network, SwapSide } from '../../constants';

const SUPPORTED_FEES = [10000n, 3000n, 500n, 100n];

// TODO: Remove before deploying to production
// const SUPPORTED_FEES = [500n];

export const UniswapV3Config: DexConfigMap<DexParams> = {
  UniswapV3: {
    [Network.MAINNET]: {
      factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
      router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      supportedFees: SUPPORTED_FEES,
      stateMulticall: '',
    },
    [Network.POLYGON]: {
      factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
      router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      supportedFees: SUPPORTED_FEES,
      stateMulticall: '0xc57941D86d5df50154c225EAF413754b2371Df17',
    },
  },
};

export const Adapters: Record<number, AdapterMappings> = {
  [Network.MAINNET]: {
    [SwapSide.SELL]: [{ name: 'Adapter01', index: 6 }],
    [SwapSide.BUY]: [{ name: 'BuyAdapter', index: 2 }],
  },
  [Network.POLYGON]: {
    [SwapSide.SELL]: [{ name: 'PolygonAdapter01', index: 13 }],
    [SwapSide.BUY]: [{ name: 'PolygonBuyAdapter', index: 2 }],
  },
};
