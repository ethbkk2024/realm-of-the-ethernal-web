import React from 'react';
import styled from 'styled-components';
import { marketTabs } from '@/utils/marketTabs';

const TabBitStyle = styled.div`
  border: 2px solid #fd5394;
  min-height: 34px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 2px;
  column-gap: 2px;
  .tab-item {
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    color: white;
    &:hover {
      background: #fd5394;
    }
    &.active {
      background: #fd5394;
    }
  }
`;
type Props = {
  tab: string;
  handleClickTab: (tab: string) => void;
};

const TabBit = ({ tab, handleClickTab }: Props) => {
  return (
    <TabBitStyle>
      {marketTabs.map((tabItem: string, index: number) => {
        return (
          <div
            key={index}
            className={`tab-item ${tab === tabItem ? 'active' : ''}`}
            onClick={() => {
              handleClickTab(tabItem);
            }}
          >
            {tabItem}
          </div>
        );
      })}
    </TabBitStyle>
  );
};

export default TabBit;
