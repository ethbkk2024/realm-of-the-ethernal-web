import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/layouts/MainLayout';
import { LoadElement } from '@/styles/animations';
import apiBattle from '@/services/battle';

const HistoryPageStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 656px);
  padding: 24px 24px 40px;
  align-items: center;
  background: #263238;

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
const HistoryPage = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    await apiBattle.getHistoryList().then((res: any) => {
      if (res) {
        setHistory(res.data);
      }
    });
  };
  return (
    <HistoryPageStyle>
      <div className={'description'}>Battle history</div>
      <HistoryListContainer>
        <div className={'header'}>
          <div className={'cell'}>No.</div>
          <div className={'cell'}>Match ID</div>
          <div className={'cell'}>Level</div>
          <div className={'cell'}></div>
        </div>
        {history &&
          history.map((res, index) => {
            return (
              <div key={index} className={'row'}>
                <div className={'cell'}>1</div>
                <div className={'cell'}>1</div>
                <div className={'cell'}>1</div>
                <div className={'cell'}>1</div>
                <div className={'cell'}>1</div>
              </div>
            );
          })}
      </HistoryListContainer>
    </HistoryPageStyle>
  );
};
HistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default HistoryPage;

const HistoryListContainer = styled.div`
  .header {
  }
  .row {
    min-width: 800px;
    width: 100%;
    height: 40px;
    background: #fdfdfd;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    overflow: hidden;
    transition: 0.15s ease-out;
    border-radius: 8px;
  }
`;
