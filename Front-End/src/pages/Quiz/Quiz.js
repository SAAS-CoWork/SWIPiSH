import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1331px;
  height: 1000px;
  margin: 100px auto 50px;
  color: #3f3a3a;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 6.4px;
  margin-bottom: 29px;
  font-weight: 700;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 113px 99px;
  margin-bottom: 40px;
  border: 1px solid black;
  border-radius: 25px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 29px;
`;

const ContentRow = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: ${(props) => props.borderBottom};
  border: 1px solid black;
`;

const QuestionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas:
    'A B'
    'A C';
`;

const NumberIcon = styled.div`
  width: 55px;
  height: 55px;
  background-color: black;
  border-radius: 50%;
  grid-area: 'A';
`;

const QuestionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 6.4px;
  grid-area: 'B';
`;

const OptionContainer = styled.div`
  width: 256px;
  height: 26px;
  border: 1px solid black;
  grid-area: 'C';
`;

const SubmitBtn = styled.button`
  width: 275px;
  height: 64px;
  background-color: black;
  font-size: 20px;
  color: white;
  line-height: 30px;
  letter-spacing: 4px;
  text-align: center;
  cursor: pointer;
`;

export default function Quiz() {
  return (
    <Wrapper>
      <Title>HAVE FUN !</Title>
      <ContentContainer>
        <Content>
          <ContentRow>
            <QuestionContainer>
              <NumberIcon></NumberIcon>
              <QuestionTitle></QuestionTitle>
              <OptionContainer></OptionContainer>
            </QuestionContainer>
          </ContentRow>
          <ContentRow></ContentRow>
          <ContentRow></ContentRow>
          <ContentRow></ContentRow>
          <ContentRow></ContentRow>
        </Content>
      </ContentContainer>
      <SubmitBtn></SubmitBtn>
    </Wrapper>
  );
}
