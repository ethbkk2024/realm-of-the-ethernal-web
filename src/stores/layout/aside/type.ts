export type AsideState = {
  open: boolean;
  balanceToken: number;
  onClickShowAside: (open: boolean) => void;
  fetchBalanceToken: (address: string) => Promise<void>;
};
