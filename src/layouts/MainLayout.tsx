import React, { ReactNode } from 'react';
import styled from 'styled-components';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ContentStyleWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #263238;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 88px;
    @media screen and (max-width: 980px) {
      margin-top: 62px;
    }
  }
`;
type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NavBar />
      <ContentStyleWrapper>
        <div className="content">{children}</div>
        <Footer />
      </ContentStyleWrapper>
    </>
  );
};

export default MainLayout;
