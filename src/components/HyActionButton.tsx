import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';

const HyActionButtonStyled = styled(Button)<{
  $boxShadow: string | undefined;
  $height: number;
  $fontSize: number;
  $dropRight: number;
  $width: string | number;
}>`
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height}px !important;
    `};

  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize}px !important;
    `};

  ${({ $boxShadow }) =>
    $boxShadow &&
    css`
      box-shadow: ${$boxShadow};
    `};
  border: none !important;
  border-radius: 32px !important;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width === 'full' ? '100%' : `${$width}px`};
    `};
  position: relative;
  overflow: hidden;
  white-space: nowrap !important;

  .text {
    z-index: 1;
  }
  .gradient {
    width: 200%;
    height: 100%;
    position: absolute;
    transition: 0.3s ease-out;
    background: linear-gradient(
      90deg,
      rgba(81, 73, 242, 1) 10%,
      rgba(253, 83, 148, 1) 100%
    );
  }
  .drop {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: white;
    position: absolute;
    transition: 0.5s ease-in-out;
    ${({ $dropRight }) =>
      $dropRight &&
      css`
        right: ${$dropRight}px;
      `};

    &.drop-gradient {
      background: linear-gradient(
        45deg,
        rgba(255, 183, 210, 1) 0%,
        rgba(253, 83, 148, 1) 100%
      );
    }
  }
  &:hover {
    .gradient {
      transform: translateX(25%);
    }
    .drop {
      filter: drop-shadow(0px 0px 8px white);
    }
  }
`;
type HyActionButtonProps = {
  text: string;
  boxShadow?: string;
  isGradient?: boolean;
  height: number;
  fontSize: number;
  dropRight: number;
  dropColor: string;
  arrowColor?: string;
  loading?: boolean;
  width: string | number;
  isRegister?: boolean | undefined;
  disabled?: boolean | undefined;
};
const HyActionButton = (props: HyActionButtonProps) => {
  const {
    text,
    boxShadow,
    isGradient,
    height,
    fontSize,
    dropRight,
    dropColor,
    arrowColor,
    loading,
    width,
    isRegister,
    disabled,
  } = props;
  console.log(loading);
  return (
    <HyActionButtonStyled
      type="submit"
      variant="contained"
      color={isRegister ? 'secondary' : 'primary'}
      disabled={disabled !== undefined ? !disabled : false}
      $boxShadow={boxShadow}
      $height={height}
      $fontSize={fontSize}
      $dropRight={dropRight}
      $width={width}
    >
      {isGradient && <div className="gradient" />}
      <span className="text">{text}</span>
      <div className={`drop ${dropColor === 'gradient' && 'drop-gradient'}`}>
        <NorthIcon
          sx={{
            rotate: '90deg',
            color: arrowColor || 'white',
          }}
        />
        {/* <Image */}
        {/*  src="/icons/icon-arrow-right.svg" */}
        {/*  width={32} */}
        {/*  height={32} */}
        {/*  alt="" */}
        {/*  priority */}
        {/* /> */}
      </div>
    </HyActionButtonStyled>
  );
};

export default HyActionButton;
