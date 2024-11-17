import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadElement } from '@/styles/animations';
import Image from 'next/image';
import BaseButton from '@/components/BaseButton';
import { isEmpty } from 'lodash';
import apiGraphql from '@/services/graphql';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { config } from '@/utils/config';
import { subAddressFormat } from '@/utils/address';
import { nftABI } from '@/utils/abi/nft';
import apiIPFS from '@/services/ipfs';
import { numberWithCommas } from '@/utils/number';

const MyNftSectionStyle = styled.div`
  width: 1200px;
  animation: ${LoadElement} 0.3s ease-in;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  place-items: center;
  margin-top: 24px;
  max-width: 100%;
  .nft-card {
    width: 100%;
    position: relative;
    padding: 24px 0 0 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    row-gap: 24px;
    overflow: hidden;
    transition: 0.15s ease-out;
    .bg-card {
      transition: 0.3s ease-out;
      transform: scale(1.2);
    }
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
      .bg-card {
        filter: saturate(2) brightness(1.1) !important;
      }
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      z-index: 1;
      color: white;
      padding: 0 24px;
    }
    .nft-image {
      width: 188px;
      z-index: 1;
      padding: 0 24px;
    }
    .card-description {
      width: 100%;
      background: #00000060;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 24px 32px 24px;
      * {
        font-size: 11px;
      }
      > div {
        text-align: center;
        line-height: 2;
      }
      .detail {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow-wrap: break-word;
        font-size: 12px;
        height: 48px;
      }
      .attributes {
        margin-top: 12px;
        letter-spacing: 2px;
        height: 110px;
        overflow: auto;
      }
    }
  }
`;
const MyNftSection = () => {
  const { address } = useAccount();
  const [myNftItem, setMyNftItem] = useState<any>([]);
  const handleClick = () => {
    console.log('click buy');
  };

  const checkBalanceOfBatch = async (uniqueNFTs: any) => {
    if (!address || uniqueNFTs.length === 0) return;

    const tokenIds = uniqueNFTs.map((nft: any) => BigInt(nft.NFT_id));
    try {
      const accounts = tokenIds.map(() => address);
      const response: any = await readContract(config, {
        abi: nftABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_NFT}`)}`,
        args: [accounts, tokenIds],
        functionName: 'balanceOfBatch',
      });

      if (response) {
        const balances = response.map((balance: any, index: number) => ({
          tokenId: Number(tokenIds[index]),
          balance: Number(balance),
        }));

        const enrichedBalances = await Promise.all(
          balances.map(async (item: any) => {
            const metadata = await apiIPFS.getMetadata(item.tokenId);
            return { ...item, metadata };
          }),
        );
        setMyNftItem(enrichedBalances);
      }
    } catch (error) {
      console.error('Error checking batch balances:', error);
    }
  };

  const fetchMyNft = async () => {
    if (address) {
      await apiGraphql.getNFTsByOwner(address).then((response) => {
        console.log('response', response);

        const nfts = response.data?.transferSingles || [];

        const uniqueNFTs = Array.from(
          new Map(nfts.map((nft: any) => [nft.NFT_id, nft])).values(),
        );
        if (uniqueNFTs) {
          checkBalanceOfBatch(uniqueNFTs);
        }
      });
    }
  };

  useEffect(() => {
    fetchMyNft();
  }, []);
  if (!isEmpty(myNftItem)) {
    return (
      <MyNftSectionStyle>
        {myNftItem.map((item: any, index: number) => (
          <div className="nft-card" key={index}>
            <div className="name">
              {item.metadata.name} ({numberWithCommas(item.balance)})
            </div>
            <Image
              src={item.metadata.image}
              width={100}
              height={100}
              alt=""
              className="nft-image"
              draggable={false}
            />
            <div className="card-description">
              <div className="detail">{item.metadata.description}</div>
              <div className="attributes">
                {item.metadata.attributes.map((attr: any, index: number) => (
                  <div key={index}>
                    {attr.trait_type}: {attr.value}
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: '24px',
                }}
              >
                <BaseButton
                  text={'Equip'}
                  handleClick={() => {
                    handleClick();
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </MyNftSectionStyle>
    );
  }
  <MyNftSectionStyle></MyNftSectionStyle>;
};

export default MyNftSection;
