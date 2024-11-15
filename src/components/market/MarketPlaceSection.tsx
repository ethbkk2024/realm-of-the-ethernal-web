import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadElement } from '@/styles/animations';
import Image from 'next/image';
import BaseButton from '@/components/BaseButton';
import { isEmpty } from 'lodash';

const MarketPlaceSectionStyle = styled.div`
  width: 800px;
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
      }
    }
  }
`;
const MarketPlaceSection = () => {
  const [marketItem, setMarketItem] = useState<any>([
    {
      name: 'Iron Sword',
      description: 'A basic but reliable sword',
      image:
        'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/1.png',
      attributes: [
        {
          trait_type: 'Type',
          value: 'Weapon',
        },
        {
          trait_type: 'Rarity',
          value: 'Common',
        },
        {
          trait_type: 'Power Bonus',
          value: 20,
        },
        {
          trait_type: 'Attack Bonus',
          value: 15,
        },
        {
          trait_type: 'Defense Bonus',
          value: 0,
        },
      ],
    },
    {
      name: 'Mythril Blade',
      description: 'A superior blade forged from mythril',
      image:
        'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/2.png',
      attributes: [
        {
          trait_type: 'Type',
          value: 'Weapon',
        },
        {
          trait_type: 'Rarity',
          value: 'Rare',
        },
        {
          trait_type: 'Power Bonus',
          value: 40,
        },
        {
          trait_type: 'Attack Bonus',
          value: 30,
        },
        {
          trait_type: 'Defense Bonus',
          value: 5,
        },
      ],
    },
    {
      name: 'Dragon Slayer',
      description: "A legendary sword infused with dragon's power",
      image:
        'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/3.png',
      attributes: [
        {
          trait_type: 'Type',
          value: 'Weapon',
        },
        {
          trait_type: 'Rarity',
          value: 'Legendary',
        },
        {
          trait_type: 'Power Bonus',
          value: 60,
        },
        {
          trait_type: 'Attack Bonus',
          value: 50,
        },
        {
          trait_type: 'Defense Bonus',
          value: 10,
        },
      ],
    },
    {
      name: 'Iron Armor',
      description: 'Standard protective armor',
      image:
        'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/4.png',
      attributes: [
        {
          trait_type: 'Type',
          value: 'Armor',
        },
        {
          trait_type: 'Rarity',
          value: 'Common',
        },
        {
          trait_type: 'Power Bonus',
          value: 15,
        },
        {
          trait_type: 'Attack Bonus',
          value: 0,
        },
        {
          trait_type: 'Defense Bonus',
          value: 20,
        },
      ],
    },
    {
      name: 'Mythril Plate',
      description: 'Superior armor crafted from mythril',
      image:
        'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/5.png',
      attributes: [
        {
          trait_type: 'Type',
          value: 'Armor',
        },
        {
          trait_type: 'Rarity',
          value: 'Rare',
        },
        {
          trait_type: 'Power Bonus',
          value: 30,
        },
        {
          trait_type: 'Attack Bonus',
          value: 5,
        },
        {
          trait_type: 'Defense Bonus',
          value: 40,
        },
      ],
    },
    {
      name: 'Divine Platemail',
      description: 'Legendary armor blessed by the gods',
      image:
        'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/6.png',
      attributes: [
        {
          trait_type: 'Type',
          value: 'Armor',
        },
        {
          trait_type: 'Rarity',
          value: 'Legendary',
        },
        {
          trait_type: 'Power Bonus',
          value: 50,
        },
        {
          trait_type: 'Attack Bonus',
          value: 10,
        },
        {
          trait_type: 'Defense Bonus',
          value: 60,
        },
      ],
    },
  ]);
  const handleClick = () => {
    console.log('click buy');
  };
  if (!isEmpty(marketItem)) {
    return (
      <MarketPlaceSectionStyle>
        {marketItem.map((item: any, index: number) => (
          <div className="nft-card" key={index}>
            <div className="name">{item.name}</div>
            <Image
              src={item.image}
              width={100}
              height={100}
              alt=""
              className="nft-image"
              draggable={false}
            />
            <div className="card-description">
              <div className="detail">{item.description}</div>
              <div className="attributes">
                {item.attributes.map((attr: any, index: number) => (
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
                  text={'Buy'}
                  handleClick={() => {
                    handleClick();
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </MarketPlaceSectionStyle>
    );
  }
  <MarketPlaceSectionStyle></MarketPlaceSectionStyle>;
};

export default MarketPlaceSection;
