import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import dynamic from 'next/dynamic';

const PvpWithoutSSR = dynamic(() => import('@/components/pvp/Pvp'), {
  ssr: false,
});

const PvpPage = () => {
  // const router = useRouter();
  // const { lv } = router.query;
  return <PvpWithoutSSR />;
};

PvpPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default PvpPage;
