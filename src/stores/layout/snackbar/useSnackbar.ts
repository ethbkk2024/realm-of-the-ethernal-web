import { create } from 'zustand';
import { SnackbarState, SnackbarProps } from '@/stores/layout/snackbar/type';

const useSnackbar = create<SnackbarState>((set) => ({
  snackBar: {
    open: false,
    text: '',
    severity: 'success',
  },
  openSnackbar: (props: SnackbarProps) => {
    set((state) => ({
      snackBar: { ...state.snackBar, ...props },
    }));
  },
}));

export default useSnackbar;
