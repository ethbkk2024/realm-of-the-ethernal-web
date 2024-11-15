import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/layouts/MainLayout';
import TabBit from '@/components/TabBit';
import LootBoxSection from '@/components/market/LootBoxSection';
import { LoadElement } from '@/styles/animations';
import MarketPlaceSection from '@/components/market/MarketPlaceSection';
import { marketTabsLeft, marketTabsRight } from '@/utils/marketTabs';

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
    width: 800px;
    max-width: 100%;
    margin-top: 8px;
    p {
      line-height: 1.8;
    }
  }
`;
const MarketplacePage = () => {
  const [tabLeft, setTabLeft] = useState<string>('Loot Box');
  const [tabRight, setTabRight] = useState<string>('Buy');
  const handleClickTabLeft = (tab: string) => {
    setTabLeft(tab);
  };
  const handleClickTabRight = (tab: string) => {
    setTabRight(tab);
  };
  return (
    <MarketplacePageStyle>
      <div className="tab-wrap">
        <TabBit
          tab={tabLeft}
          tabList={marketTabsLeft}
          handleClickTab={handleClickTabLeft}
        />
        {tabLeft === 'Marketplace' && (
          <TabBit
            tab={tabRight}
            tabList={marketTabsRight}
            handleClickTab={handleClickTabRight}
          />
        )}
      </div>
      {tabLeft === 'Loot Box' && (
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
      {tabLeft === 'Marketplace' && tabRight === 'Buy' && (
        <>
          <div className="description">
            <p>
              Marketplace: A platform for players to buy, sell, and trade
              in-game items or characters from loot boxes, offering a secure and
              easy trading experience.
            </p>
          </div>
          <MarketPlaceSection />
        </>
      )}
      {tabLeft === 'Marketplace' && tabRight === 'List' && (
        <>
          <div className="description">
            <p>
              List Page: A page where players can list their in-game items or
              characters for sale on the marketplace. Sellers can set prices and
              manage their listings easily.
            </p>
          </div>
          <MarketPlaceSection />
        </>
      )}
    </MarketplacePageStyle>
  );
};
MarketplacePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MarketplacePage;
