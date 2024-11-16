import { create } from 'zustand';
import { readContract } from 'wagmi/actions';
import { subAddressFormat } from '@/utils/address';
import { realmABI } from '@/utils/abi/token';
import { config } from '@/utils/config';

export type AsideState = {
  open: boolean;
  balanceToken: number; // Balance in Ether
  onClickShowAside: (open: boolean) => void;
  fetchBalanceToken: (address: string) => Promise<void>;
};

const useAside = create<AsideState>((set) => ({
  open: false,
  balanceToken: 0,
  onClickShowAside: (open: boolean) => {
    set((state) => ({ ...state, open }));
  },
  fetchBalanceToken: async (address: string) => {
    try {
      const response = await readContract(config, {
        abi: realmABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_REALM}`)}`,
        functionName: 'balanceOf',
        args: [`0x${subAddressFormat(address)}`],
      });

      const valueEth = Number(response) / 10 ** 18;
      set((state) => ({ ...state, balanceToken: valueEth })); // Update balanceToken in state
    } catch (error) {
      console.error('Error fetching token balance:', error);
      set((state) => ({ ...state, balanceToken: 0 })); // Reset balanceToken on error
    }
  },
}));

export default useAside;
