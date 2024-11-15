import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';

const ActionButtonStyled = styled(Button)<{
  $boxShadow: string | undefined;
  $height: number;
  $fontSize: number;
  $dropRight: number;
  $width: string | number;
}>`
  height: 38px;
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize}px !important;
    `};
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

  border: none !important;
  border-radius: 0 !important;
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
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width === 'full' ? '100%' : `${$width}px`};
    `};
  position: relative;
  overflow: hidden;
  white-space: nowrap !important;
  justify-content: start !important;
  padding-left: 24px;
  background: linear-gradient(
    90deg,
    rgba(59, 0, 102, 1) 0%,
    rgba(0, 56, 94, 1) 100%
  );
  filter: saturate(2);

  .text {
    z-index: 1;
  }
  .drop {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    position: absolute;
    transition: 0.5s ease-in-out;
    right: 8px;
    border-radius: 50%;
    * {
      font-size: 16px;
    }
    &.drop-gradient {
      background: linear-gradient(
        45deg,
        rgba(255, 183, 210, 1) 0%,
        rgba(253, 83, 148, 1) 100%
      );
    }
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
    filter: saturate(2) brightness(1.2);
    .drop {
      filter: drop-shadow(0px 0px 8px white);
    }
  }
`;
type ActionButtonProps = {
  text: string;
  boxShadow?: string;
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
const ActionButton = (props: ActionButtonProps) => {
  const {
    text,
    boxShadow,
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
    <ActionButtonStyled
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
    </ActionButtonStyled>
  );
};

export default ActionButton;
