import React from 'react';
import styled from 'styled-components';
import { LoadElement } from '@/styles/animations';

const TabBitStyle = styled.div`
  border: 2px solid #fd5394;
  min-height: 34px;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 2px;
  column-gap: 2px;
  animation: ${LoadElement} 0.3s ease-in;
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

    &:nth-child(odd):hover,
    &:nth-child(odd).active {
      background: #9d90ff;
    }

    &:nth-child(even):hover,
    &:nth-child(even).active {
      background: #fd5394;
    }
  }
`;

type Props = {
  tab: string;
  handleClickTab: (tab: string) => void;
  tabList: string[];
};

const TabBit = ({ tab, handleClickTab, tabList }: Props) => {
  return (
    <TabBitStyle>
      {tabList.map((tabItem: string, index: number) => {
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
