import React from 'react';
import styled from 'styled-components';
import profile from './profile.png';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 1331px;
  height: 529px;
  margin: 100px auto 50px;
  border: 1px solid black;
  border-radius: 25px;
  color: #3f3a3a;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 941px;
  height: 364px;
  margin: 72px auto 93px;
`;

const Title = styled.h1`
  font-size: 24px;
  letter-spacing: 6.4px;
  font-weight: 700;
  line-height: 38px;
`;

const SplitLine = styled.hr`
  width: 100%;
  margin: 0 0 66px;
`;

const LoginInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-bottom: 69px;
`;

const LoginRow = styled.form`
  width: 696px;
  display: flex;
`;

const LoginInfoTitleContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 26px;
`;

const LoginInfoTitle = styled.h2`
  width: 120px;
  line-height: 29px;
`;

const LoginIcon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${profile});
`;

const LoginInput = styled.input`
  box-sizing: border-box;
  width: 576px;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
`;

const LoginBtn = styled.button`
  width: 240px;
  height: 64px;
  background-color: black;
  border: 0;
  color: white;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

export default function Login() {
  return (
    <Wrapper>
      <ContentContainer>
        <LoginInfoTitleContainer>
          <Title>會員登入</Title>
          <LoginIcon></LoginIcon>
        </LoginInfoTitleContainer>
        <SplitLine></SplitLine>
        <LoginInfoContainer>
          <LoginRow>
            <LoginInfoTitle>帳號</LoginInfoTitle>
            <LoginInput></LoginInput>
          </LoginRow>
          <LoginRow>
            <LoginInfoTitle>密碼</LoginInfoTitle>
            <LoginInput></LoginInput>
          </LoginRow>
        </LoginInfoContainer>
        <LoginBtn>登入</LoginBtn>
      </ContentContainer>
    </Wrapper>
  );
}
