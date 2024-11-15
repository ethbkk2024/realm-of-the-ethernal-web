import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/layouts/MainLayout';
import TabBit from '@/components/TabBit';
import LootBoxSection from '@/components/market/LootBoxSection';
import { LoadElement } from '@/styles/animations';

const MarketplacePageStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 656px);
  padding: 24px 24px 40px;
  align-items: center;
  background: #263238;
  .tab-wrap {
    width: 800px;
    max-width: 100%;
    animation: ${LoadElement} 0.3s ease-in;
  }
  .description {
    animation: ${LoadElement} 0.3s ease-in;
    text-align: center;
    color: white;
    width: 800px;
    max-width: 100%;
    margin-top: 8px;
    p {
      line-height: 1.8;
    }
  }
`;
const MarketplacePage = () => {
  const [tab, setTab] = useState<string>('Loot Box');
  const handleClickTab = (tab: string) => {
    setTab(tab);
  };
  return (
    <MarketplacePageStyle>
      <div className="tab-wrap">
        <TabBit tab={tab} handleClickTab={handleClickTab} />
      </div>
      {tab === 'Loot Box' && (
        <>
          <div className="description">
            <p>
              Character Box: A loot box that offers unique or rare characters
              for players to use in the game, enhancing their gameplay
              experience and strategy.
            </p>
            <p>
              Item Box: A loot box that contains valuable in-game items, which
              players can use to improve their performance or sell on the
              marketplace to trade with others.
            </p>
          </div>
          <LootBoxSection />
        </>
      )}
      {tab === 'Marketplace' && (
        <div></div>
        // <MarketPlaceSection>Marketplace</MarketPlaceSection>
      )}
    </MarketplacePageStyle>
  );
};
MarketplacePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MarketplacePage;
