import React from 'react';
import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const BrandMarqueeStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 40px 0 0;
  .content-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 42px;
    .brand-marquee {
      width: 100%;
      display: flex;
      align-items: center;
      .brand {
        width: 286px;
        height: 286px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #dbe2e5;
        border-left: 0;
        @media screen and (max-width: 980px) {
          width: 234px;
          height: 234px;
          img {
            transform: scale(0.8);
          }
        }
        @media screen and (max-width: 768px) {
          width: 200px;
          height: 200px;
          img {
            transform: scale(0.7);
          }
        }
        @media screen and (max-width: 580px) {
          width: 174px;
          height: 174px;
          img {
            transform: scale(0.6);
          }
        }
        @media screen and (max-width: 430px) {
          width: 150px;
          height: 150px;
          img {
            transform: scale(0.5);
          }
        }
      }
    }
  }
`;
const BrandMarquee = () => {
  return (
    <BrandMarqueeStyled>
      <div className="content-wrap ">
        <Marquee speed={60} autoFill={true} pauseOnClick={true}>
          <div className="brand-marquee">
            <div className="brand">
              <Image
                src="/icons/icon-hyseller-gradient.svg"
                width={112}
                height={126}
                alt=""
                priority
              />
            </div>
            <div className="brand">
              <Image
                src="/icons/SheetPapers.svg"
                width={112}
                height={126}
                alt=""
                priority
              />
            </div>
            <div className="brand">
              <Image
                src="/icons/icon-hy-seller-black.svg"
                width={112}
                height={126}
                alt=""
                priority
              />
            </div>
            <div className="brand">
              <Image
                src="/icons/internth.svg"
                width={112}
                height={126}
                alt=""
                priority
              />
            </div>
          </div>
        </Marquee>
      </div>
    </BrandMarqueeStyled>
  );
};

export default BrandMarquee;
