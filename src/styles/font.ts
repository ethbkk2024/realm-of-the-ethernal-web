import localFont from 'next/font/local';

export const realmFont = localFont({
  // variable: '--realm-font',
  src: [
    {
      path: '../../public/fonts/PressStart2P-Regular.ttf',
      // weight: '400',
      style: 'normal',
    },
    // {
    //   path: '../../public/assets/fonts/line/LINESeedSansTH_W_Bd.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
});
