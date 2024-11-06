import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import FirstSection from '@/components/landing/FirstSection';
import FeatureSection from '@/components/landing/FeatureSection';
import WhyPlaySection from '@/components/landing/WhyPlaySection';

const HomePage = () => {
  return (
    <>
      <FirstSection />
      <FeatureSection />
      <WhyPlaySection />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default HomePage;
