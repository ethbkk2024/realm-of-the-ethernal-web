import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import dynamic from 'next/dynamic';

const QuestWithoutSSR = dynamic(() => import('@/components/quest/Quest'), {
  ssr: false,
});

const QuestPage = () => {
  return <QuestWithoutSSR />;
};

QuestPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default QuestPage;
