import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

const HySellerSocialMaterialStyled = styled.div`
  max-width: 832px;
  min-width: 640px;
  width: 42vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1382px) {
    max-width: 100%;
    min-width: auto;
    row-gap: 42px;
    width: 840px;
  }
  .presenter-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    @media screen and (max-width: 1382px) {
      max-width: 100%;
      width: 1130px;
    }
    .presenter-main {
      display: block;
      @media screen and (max-width: 620px) {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .tiktok-landing {
      position: absolute;
      top: -8px;
      left: 74px;
      @media screen and (max-width: 770px) {
        left: 10%;
        top: -4%;
        img {
          width: 20vw;
          height: 20vw;
        }
      }
    }
    .facebook-landing {
      position: absolute;
      bottom: 150px;
      right: 0;
      @media screen and (max-width: 770px) {
        right: 4%;
        bottom: 25%;
        img {
          width: 20vw;
          height: 20vw;
        }
      }
      @media screen and (max-width: 700px) {
        right: 2%;
      }
      @media screen and (max-width: 670px) {
        right: 0%;
      }
      @media screen and (max-width: 524px) {
        right: 0;
        img {
          width: 24vw;
          height: 24vw;
        }
      }
    }
    .messenger-landing {
      position: absolute;
      bottom: 200px;
      left: 32px;
      @media screen and (max-width: 830px) {
        left: 8%;
      }
      @media screen and (max-width: 770px) {
        bottom: 22%;
        left: 4%;
        img {
          width: 20vw;
          height: 20vw;
        }
      }
      @media screen and (max-width: 565px) {
        img {
          width: 24vw;
          height: 24vw;
        }
      }
      @media screen and (max-width: 480px) {
        left: 0;
      }
    }
    .meta-landing {
      position: absolute;
      bottom: 30px;
      right: 164px;
      @media screen and (max-width: 770px) {
        right: 12%;
        bottom: 0;
        img {
          width: 18vw;
          height: 18vw;
        }
      }
      @media screen and (max-width: 565px) {
        img {
          width: 22vw;
          height: 22vw;
        }
      }
    }
    .presenter-circle {
      position: absolute;
      bottom: -34px;
      left: 64px;
      @media screen and (max-width: 770px) {
        img {
          width: 200px;
          height: 200px;
        }
      }
      @media screen and (max-width: 770px) {
        bottom: -42px;
        left: 64px;
      }
      @media screen and (max-width: 600px) {
        img {
          width: 188px;
          height: 188px;
        }
      }
      @media screen and (max-width: 460px) {
        bottom: -42px;
        left: 34px;
        img {
          width: 164px;
          height: 164px;
        }
      }
      @media screen and (max-width: 380px) {
        bottom: -30px;
        left: 12px;
        img {
          width: 134px;
          height: 134px;
        }
      }
      @media screen and (max-width: 290px) {
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
    .pink-ball {
      position: absolute;
      top: 40px;
      right: 0;
      @media screen and (max-width: 770px) {
        img {
          width: 112px;
          height: 112px;
        }
      }
      @media screen and (max-width: 460px) {
        right: -4%;
      }
      @media screen and (max-width: 380px) {
        right: -14%;
        top: 20px;
      }
    }
    .violet-ball {
      position: absolute;
      top: 224px;
      left: 24px;
      @media screen and (max-width: 770px) {
        top: 108px;
      }
      @media screen and (max-width: 600px) {
        display: none;
      }
    }
  }
`;

type HySellerSocialMaterialProps = {
  isRegister?: boolean | undefined;
};
const HySellerSocialMaterial = (props: HySellerSocialMaterialProps) => {
  const { isRegister } = props;
  return (
    <HySellerSocialMaterialStyled>
      <div className="presenter-content">
        <motion.div
          className="presenter-main"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src={
              isRegister
                ? '/images/presenter-register.png'
                : '/images/presenter-main.png'
            }
            width={578}
            height={858}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="tiktok-landing"
          animate={{
            rotate: [0, 5, 0],
            y: [0, -20, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/tiktok-landing.svg"
            width={154}
            height={178}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="facebook-landing"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 2.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/facebook-landing.svg"
            width={162}
            height={162}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="messenger-landing"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 2.2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/messenger-landing.svg"
            width={150}
            height={150}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="meta-landing"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 1.8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/meta-landing.svg"
            width={119}
            height={57}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="violet-ball"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 2.4,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/violet-ball.svg"
            width={80}
            height={80}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="presenter-circle"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 1.6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/presenter-circle.png"
            width={250}
            height={250}
            alt=""
            priority
          />
        </motion.div>

        <motion.div
          className="pink-ball"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 1.8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <Image
            src="/images/pink-ball.svg"
            width={180}
            height={180}
            alt=""
            priority
          />
        </motion.div>
      </div>
    </HySellerSocialMaterialStyled>
  );
};

export default HySellerSocialMaterial;
