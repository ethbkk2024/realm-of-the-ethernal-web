import React from 'react';
import styled from 'styled-components';
import { LoadElement } from '@/styles/animations';

const BaseButtonStyle = styled.button`
  all: unset;
  height: 34px;
  padding: 0 16px;
  background: #9d90ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s ease-out;
  animation: ${LoadElement} 0.3s ease-in;
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
  z-index: 1;
  color: white;
`;
type Props = {
  text: string;
  handleClick: () => void;
};
const BaseButton = ({ text, handleClick }: Props) => {
  return (
    <BaseButtonStyle
      onClick={() => {
        handleClick();
      }}
    >
      <span>{text}</span>
    </BaseButtonStyle>
  );
};

export default BaseButton;
