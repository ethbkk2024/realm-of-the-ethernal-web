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
  const [battleDetail, setBattleDetail] = useState<any>(null);

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

  const getHistoryDetails = async (id: any) => {
    await apiBattle.getBattleDetail(id).then((res: any) => {
      if (res) {
        setBattleDetail(res.data);
      } else {
        setBattleDetail(null);
      }
    });
  };

  return (
    <>
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
                  <div className={'cell'}>{index + 1}</div>
                  <div className={'cell'}>{res.match_id}</div>
                  <div className={'cell'}>{res.battle_level}</div>
                  <div className={'cell'}>
                    <div
                      className={'btn'}
                      onClick={() => getHistoryDetails(res.id)}
                    >
                      Detail
                    </div>
                  </div>
                </div>
              );
            })}
        </HistoryListContainer>
      </HistoryPageStyle>
      {battleDetail && (
        <BattleDetailModal>
          <div className={'head'} onClick={() => setBattleDetail(null)}>
            <div>
              {battleDetail.summary.winner === 'boss' ? 'Defeat' : 'Winner'}
            </div>
            <div>X</div>
          </div>
          <HistoryListContainer>
            <div className={'header black'}>
              <div className={'cell'}>Attacker</div>
              <div className={'cell'}>Damage</div>
              <div className={'cell'}>HP</div>
              <div className={'cell'}>Max HP</div>
            </div>
            {battleDetail &&
              battleDetail.action_list.map((res: any, index: number) => {
                return (
                  <div key={index} className={'row'}>
                    <div className={'cell'}>{res.attacker}</div>
                    <div className={'cell'}>{res.damage}</div>
                    <div className={'cell'}>{res.hp}</div>
                    <div className={'cell'}>{res.maxHp}</div>
                  </div>
                );
              })}
          </HistoryListContainer>
        </BattleDetailModal>
      )}
    </>
  );
};
HistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default HistoryPage;

const HistoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px;

  .header {
    min-width: 800px;
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    overflow: hidden;
    transition: 0.15s ease-out;
    border-radius: 8px;
    align-items: center;
    text-align: center;
    color: #fff;
  }

  .header.black {
    color: #000;
    background: #d9d9d9;
  }

  .row {
    min-width: 800px;
    width: 100%;
    height: 40px;
    background: #fdfdfd;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    overflow: hidden;
    transition: 0.15s ease-out;
    border-radius: 8px;
    align-items: center;
    text-align: center;

    .btn {
      background: #ff8237;
      color: #fff;
      border-radius: 8px;
      height: 28px;
      width: fit-content;
      justify-self: end;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-inline: 4px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;

const BattleDetailModal = styled.div`
  position: absolute;
  height: fit-content;
  width: fit-content;
  background: white;
  top: 88px;
  z-index: 99;
  border-radius: 8px;
  .head {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    font-size: 18px;
    cursor: pointer;
  }
`;
