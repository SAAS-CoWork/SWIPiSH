import React from 'react';
import styled from 'styled-components';
import profile from './profile.png';

const questions = ['姓名', '手機', '信箱', '帳號', '密碼', '密碼確認'];

const Wrapper = styled.div`
  width: 1331px;
  border: 1px solid black;
  border-radius: 25px;
  margin: 100px auto 50px;
  padding: 63px 0 79px;
  color: #3f3a3a;
`;

const ContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  gap: 17px;
  margin-bottom: 34px;
`;

const TitleText = styled.h1`
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 6.4px;
  font-weight: 700;
`;

const ProfileIcon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${profile});
`;

const SplitLine = styled.hr`
  width: 941px;
  margin-bottom: 91px;
`;

const InfoContainer = styled.div`
  width: 696px;
  margin-bottom: 97px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const QuestionTitle = styled.label`
  width: 120px;
  line-height: 19px;
`;

const QuestionInput = styled.input`
  box-sizing: border-box;
  width: 576px;
  height: 32px;
  padding-left: 8px;
  border-radius: 8px;
  border: 1px solid #979797;
`;

const SubmitBtn = styled.button`
  width: 240px;
  height: 64px;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 79px;
  letter-spacing: 4px;
  border: 0;
`;

export default function Register() {
  return (
    <Wrapper>
      <ContentContainer>
        <Title>
          <TitleText>會員註冊</TitleText>
          <ProfileIcon />
        </Title>
        <SplitLine />
        <InfoContainer>
          {questions.map((question) => (
            <InfoRow>
              <QuestionTitle>{question}</QuestionTitle>
              <QuestionInput />
            </InfoRow>
          ))}
        </InfoContainer>
        <SubmitBtn>玩個小遊戲！</SubmitBtn>
      </ContentContainer>
    </Wrapper>
  );
}
