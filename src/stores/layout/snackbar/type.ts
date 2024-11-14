export type SnackbarState = {
  snackBar: SnackbarProps;
  openSnackbar: (props: SnackbarProps) => void;
};

export type SnackbarProps = {
  open: boolean;
  text: string;
  severity: 'success' | 'error' | 'info' | 'warning';
};
