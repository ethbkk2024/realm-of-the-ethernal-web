import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/layouts/MainLayout';
import TabBit from '@/components/TabBit';
import { LoadElement } from '@/styles/animations';
import { inventoryTabs } from '@/utils/marketTabs';
import MyNftSection from '@/components/inventory/MyNftSection';

const InventoryPageStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 656px);
  padding: 24px 24px 40px;
  align-items: center;
  background: #263238;
  .tab-wrap {
    width: 1200px;
    max-width: 100%;
    animation: ${LoadElement} 0.3s ease-in;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }
  .description {
    animation: ${LoadElement} 0.3s ease-in;
    text-align: center;
    color: white;
    width: 1200px;
    max-width: 100%;
    margin-top: 8px;
    p {
      line-height: 1.8;
    }
  }
`;
const InventoryPage = () => {
  const [tab, setTab] = useState<string>('My NFT');
  const handleClickTab = (tab: string) => {
    setTab(tab);
  };
  return (
    <InventoryPageStyle>
      <div className="tab-wrap">
        <TabBit
          tab={tab}
          tabList={inventoryTabs}
          handleClickTab={handleClickTab}
        />
      </div>
      {tab === 'My NFT' && (
        <>
          <div className="description">
            <p>
              My NFTs: This page displays the NFTs in your bag that you own. You
              can list them for sale in the marketplace by setting your desired
              price and easily manage your listings.
            </p>
          </div>
          <MyNftSection />
        </>
      )}
      {tab === 'My List' && (
        <>
          <div className="description">
            <p>
              List Page: A page where players can list their in-game items or
              characters for sale on the marketplace. Sellers can set prices and
              manage their listings easily.
            </p>
          </div>
          {/* <MarketPlaceSection /> */}
        </>
      )}
    </InventoryPageStyle>
  );
};
InventoryPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default InventoryPage;
