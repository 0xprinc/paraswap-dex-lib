import { Contract } from 'web3-eth-contract';
import { SparkSDaiPoolState } from './types';
import { Interface, AbiCoder } from '@ethersproject/abi';

const coder = new AbiCoder();

// - `dsr`: the Dai Savings Rate
// - `chi`: the Rate Accumulator
// - `rho`: time of last drip
export async function getOnChainState(
  multiContract: Contract,
  potAddress: string,
  potInterface: Interface,
  blockNumber: number | 'latest',
): Promise<SparkSDaiPoolState> {
  const data: { returnData: any[] } = await multiContract.methods
    .aggregate([
      {
        target: potAddress,
        callData: potInterface.encodeFunctionData('dsr', []),
      },
      {
        target: potAddress,
        callData: potInterface.encodeFunctionData('chi', []),
      },
      {
        target: potAddress,
        callData: potInterface.encodeFunctionData('rho', []),
      },
      {
        target: potAddress,
        callData: potInterface.encodeFunctionData('live', []),
      },
    ])
    .call({}, blockNumber);

  const [dsr, chi, rho, live] = data.returnData.map(item =>
    coder.decode(['uint256'], item)[0].toString(),
  );

  return {
    live: !!live,
    dsr,
    chi,
    rho,
  };
}
