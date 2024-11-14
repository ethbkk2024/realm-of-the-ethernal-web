import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MainLayout from '@/layouts/MainLayout';

const MarketplacePageStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100dvh - 616px);
`;
const MarketplacePage = () => {
  return <MarketplacePageStyle>Marketplace</MarketplacePageStyle>;
};
MarketplacePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MarketplacePage;
