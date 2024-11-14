import { create } from 'zustand';
import { AsideState } from '@/stores/layout/aside/type';

const useAside = create<AsideState>((set) => ({
  open: false,
  onClickShowAside: async (open: boolean) => {
    set((state: AsideState) => ({ ...state, open }));
  },
}));

export default useAside;
