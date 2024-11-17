import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ActionButton from '@/components/ActionButton';
import styled from 'styled-components';
import Image from 'next/image';
import BrandMarquee from '@/components/landing/BrandMarquee';
import { LoadElement } from '@/styles/animations';
import BaseButton from '@/components/BaseButton';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import useSnackbar from '@/stores/layout/snackbar/useSnackbar';
import { subAddressFormat } from '@/utils/address';
import { realmABI } from '@/utils/abi/token';
import { extractErrorReason } from '@/utils/errorContract';
import useAside from '@/stores/layout/aside/useAside';
import { Skeleton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { isEmpty } from 'lodash';
import { numberWithCommas } from '@/utils/number';
import { readContract } from 'wagmi/actions';
import { config } from '@/utils/config';
import { gameABI } from '@/utils/abi/game';

const FirstSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -88px;
  max-width: 100%;
  flex-direction: column;
  padding: 134px 40px 40px;
  position: relative;
  @media screen and (max-width: 980px) {
    padding: 124px 40px 26px;
  }
  @media screen and (max-width: 620px) {
    padding: 118px 24px 26px;
  }

  .bg-image {
    z-index: 0;
    filter: brightness(0.7);
    object-fit: cover;
  }

  .header-landing {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .header-content-wrap {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 1200px;
      max-width: 100%;
      row-gap: 8px;

      h1 {
        font-size: 32px;
        text-align: center;
        line-height: 1.4;
        z-index: 1;
        @media screen and (max-width: 980px) {
          font-size: 28px;
        }
        @media screen and (max-width: 768px) {
          font-size: 24px;
        }
        @media screen and (max-width: 620px) {
          font-size: 20px;
        }
      }

      .h1 {
        font-size: 20px;
        text-align: center;
        line-height: 1.4;
        @media screen and (max-width: 980px) {
          font-size: 18px;
        }
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }

      p {
        font-size: 14px;
        text-align: center;
        z-index: 1;
        max-width: 980px;
      }
    }
  }

  .first-section-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    @media screen and (max-width: 980px) {
      margin-top: 26px;
    }
    @media screen and (max-width: 768px) {
      //
    }
    @media screen and (max-width: 620px) {
      button {
        height: 48px !important;

        .drop {
          width: 34px;
          height: 34px;
        }
      }
    }

    .topic-leaderboard {
      font-size: 16px;
      text-align: center;
      z-index: 1;
      color: white;
      margin-bottom: 16px;
      max-width: 980px;
    }

    .description-leaderboard {
      text-align: center;
      z-index: 1;
      color: white;
      margin-bottom: 24px;
      line-height: 1.8;
      max-width: 980px;
    }

    .player-wrap {
      min-height: 450px;
      width: 800px;
      background: #ffffff80;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      max-width: 100%;
      z-index: 1;
      overflow: hidden;
      transition: 0.15s ease-out;
      box-shadow:
        0px 0px 0px 2px white,
        2px 2px 0px 0px #9d90ff,
        -2px 2px 0px 0px #9d90ff,
        2px -2px 0px 0px #9d90ff,
        -2px -2px 0px 0px #9d90ff,
        4px 0px 0px 0px white,
        -4px 0px 0px 0px white,
        0px 4px 0px 0px white,
        0px -4px 0px 0px white,
        inset 0px 0px 0px 4px #897de0,
        inset 4px 4px 0px 0px white,
        inset -4px 4px 0px 0px white,
        inset 4px -4px 0px 0px white,
        inset -4px -4px 0px 0px white;

      &:hover {
        box-shadow:
          0px 0px 0px 4px white,
          4px 4px 0px 0px #9d90ff,
          -4px 4px 0px 0px #9d90ff,
          4px -4px 0px 0px #9d90ff,
          -4px -4px 0px 0px #9d90ff,
          8px 0px 0px 0px white,
          -8px 0px 0px 0px white,
          0px 8px 0px 0px white,
          0px -8px 0px 0px white,
          inset 0px 0px 0px 4px #897de0,
          inset 4px 4px 0px 0px white,
          inset -4px 4px 0px 0px white,
          inset 4px -4px 0px 0px white,
          inset -4px -4px 0px 0px white;
      }

      @media screen and (max-width: 980px) {
        margin-bottom: 26px;
      }

      .video {
        opacity: 0;
        animation: ${LoadElement} 0.3s ease-in 0.3s forwards;
      }
    }

    .table-wrapper {
      position: relative;
      z-index: 1;
      max-width: 100%;
      width: 780px;
      margin-bottom: 40px;
      transition: 0.15s ease-out;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0px 0px 8px 0px #ffffff;
      .MuiDataGrid-cell--withRenderer {
        &:nth-child(2) {
          padding-left: 0 !important;
        }
      }

      .MuiDataGrid-columnHeader {
        &:nth-child(2) {
          padding-left: 0 !important;
        }
      }
    }
  }
`;
const BrandMarqueeWrapStyled = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #263238;
  * {
    color: white;
  }
  .text-group {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    align-items: center;
    h2 {
      font-size: 32px;
      margin-top: 40px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 30px;
      }
      @media screen and (max-width: 768px) {
        font-size: 24px;
      }
      @media screen and (max-width: 620px) {
        font-size: 18px;
        padding: 0 24px;
      }
    }
    .h2 {
      font-size: 20px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 18px;
      }
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      @media screen and (max-width: 620px) {
        font-size: 14px;
      }
    }
    p {
      text-align: center;
      font-weight: 400;
      max-width: 768px;
    }
  }
`;
// type VideoPlayerProps = {
//   videoUrl: string;
// };

// const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => (
//   <Plyr
//     source={{
//       type: 'video',
//       sources: [
//         {
//           src: videoUrl,
//           type: 'video/mp4',
//         },
//       ],
//     }}
//     options={{
//       controls: [
//         'play',
//         'progress',
//         'current-time',
//         'mute',
//         'volume',
//         'fullscreen',
//       ],
//     }}
//   />
// );
const FirstSection = () => {
  const { address, isConnected } = useAccount();
  const { fetchBalanceToken } = useAside();
  const fillMock = {
    id: 0,
    player: 'Loading...',
    score: 0,
  };
  const {
    data: hash,
    writeContract,
    isPending,
    isError,
    error,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isErrorTransaction,
  } = useWaitForTransactionReceipt({
    hash,
  });
  // const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [loadingRealm, setLoadingRealm] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<any>([]);

  const getLeaderboard = async () => {
    try {
      const response: any = await readContract(config, {
        abi: gameABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_GAME}`)}`,
        functionName: 'getCurrentWeekLeaderboard',
      });

      const players = response[0] || [];
      const scores = response[1] || [];

      if (players.length !== scores.length) {
        console.error('Players and scores length mismatch');
        return;
      }

      const leaderboardData = players.map((player: string, index: number) => ({
        id: index + 1,
        player:
          player === '0x0000000000000000000000000000000000000000'
            ? 'N/A'
            : player,
        score: Number(scores[index]) || 0,
      }));

      setRows(leaderboardData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setRows([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeaderboard();
    setIsHydrated(true);
  }, []);
  const columns: GridColDef[] = [
    {
      field: '#',
      headerName: '#',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      minWidth: 64,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="overflow-hidden text-ellipsis">
            {isLoading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                width={64}
                height={16}
              />
            ) : (
              params.api.getRowIndex(params.row.id) + 1
            )}
          </div>
        );
      },
    },
    {
      field: 'player',
      headerName: 'Player',
      editable: false,
      headerAlign: 'left',
      align: 'left',
      minWidth: 148,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="overflow-hidden text-ellipsis">
            {isLoading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                width={92}
                height={16}
              />
            ) : (
              params.row.player
            )}
          </div>
        );
      },
    },
    {
      field: 'score',
      headerName: 'Score',
      editable: false,
      headerAlign: 'right',
      align: 'right',
      minWidth: 148,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div className="overflow-hidden text-ellipsis">
            {isLoading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                width={100}
                height={16}
              />
            ) : (
              numberWithCommas(params.row.score)
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isEmpty(rows)) {
      setIsLoading(false);
    }
  }, [rows]);
  // useEffect(() => {
  //   const video = document.createElement('video');
  //   video.src = 'https://assets.sheetpapers.com/videos%2Fman-on-the-cloud.mp4';
  //   video.onloadeddata = () => setIsVideoLoaded(true);
  // }, []);

  useEffect(() => {
    setLoadingRealm(!!(isPending || isConfirming));
    if (address) {
      fetchBalanceToken(address);
    }
  }, [isConfirming, isPending, isConfirmed, isError]);

  const handleGetRealm = () => {
    setLoadingRealm(true);
    if (!isPending && !isConfirming) {
      writeContract({
        abi: realmABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_REALM}`)}`,
        functionName: 'claimInitialTokens',
        args: [],
      });
    }
    setLoadingRealm(false);
  };

  useEffect(() => {
    if (isConfirmed) {
      useSnackbar.getState().openSnackbar({
        open: true,
        text: 'Transaction success.',
        severity: 'success',
      });
    } else if (isError) {
      const errorReason = extractErrorReason(error);
      useSnackbar.getState().openSnackbar({
        open: true,
        text: errorReason,
        severity: 'error',
      });
    }
  }, [isConfirmed, isError, isErrorTransaction]);

  return (
    <>
      <FirstSectionStyled id="/">
        <Image
          src="/images/bg-4.png"
          fill
          alt=""
          priority
          className="bg-image"
          draggable={false}
        />
        <header className="header-landing">
          <div className="header-content-wrap">
            <h1>Realm Of The Eternal</h1>
            <p className="h1">Explore a Mystical World of Endless Knowledge</p>
            <p>
              Venture into an ancient archive filled with hidden artifacts,
              mystical spells, and secrets from a forgotten era. Unlock
              treasures and face thrilling quests as you journey deeper into the
              unknown.
            </p>
          </div>
        </header>
        {isHydrated && isConnected && (
          <div
            style={{
              marginTop: '16px',
              zIndex: '1',
            }}
          >
            <BaseButton
              text={`${loadingRealm ? 'Loading...' : 'Get (1000 Realm)'}`}
              handleClick={() => {
                if (!loadingRealm && isHydrated && isConnected) {
                  handleGetRealm();
                }
              }}
            />
          </div>
        )}
        <section className="first-section-content">
          <div className="topic-leaderboard">Top 10 Weekly Leaderboard</div>
          <div className="description-leaderboard">
            Discover the top 10 players of the week who have achieved remarkable
            scores and demonstrated exceptional skills. The leaderboard
            refreshes every week, so keep competing to secure your spot among
            the best!
          </div>
          <div className="table-wrapper">
            {!isLoading && (
              <DataGrid
                hideFooter
                rows={rows || []}
                columns={columns}
                paginationMode="server"
                rowCount={rows.length}
                disableSelectionOnClick={false}
                sortModel={[]}
                autoHeight={true}
                getRowHeight={() => 44}
                headerHeight={38}
              />
            )}
            {isLoading && (
              <DataGrid
                hideFooter
                rows={Array(10).fill({ ...fillMock })}
                columns={columns}
                paginationMode="server"
                rowCount={10}
                disableSelectionOnClick={false}
                sortModel={[]}
                autoHeight={true}
                getRowHeight={() => 44}
                headerHeight={38}
              />
            )}
          </div>
          {/* <div className="player-wrap"> */}
          {/*  {isVideoLoaded ? ( */}
          {/*    <div className="video"> */}
          {/*      <VideoPlayer */}
          {/*        videoUrl={ */}
          {/*          'https://assets.sheetpapers.com/videos%2Fman-on-the-cloud.mp4' */}
          {/*        } */}
          {/*      /> */}
          {/*    </div> */}
          {/*  ) : ( */}
          {/*    <p>Loading video...</p> */}
          {/*  )} */}
          {/* </div> */}
          <Link href={`#`}>
            <ActionButton
              text="Start the Adventure"
              boxShadow="0px 0px 0px 2px white inset !important"
              height={56}
              fontSize={12}
              dropRight={8}
              dropColor={'gradient'}
              width={308}
            />
          </Link>
        </section>
      </FirstSectionStyled>
      <BrandMarqueeWrapStyled>
        <div className="text-group">
          <h2>The Secrets of the Eternal</h2>
          <p className="h2 mt-[16px]">Join a world where knowledge is power.</p>
          <p>
            Dive into quests that challenge your wits and courage. Unravel
            mysteries, collect rare artifacts, and become part of a story that
            blends ancient wisdom with modern technology.
          </p>
        </div>
        <BrandMarquee />
      </BrandMarqueeWrapStyled>
    </>
  );
};
export default FirstSection;
