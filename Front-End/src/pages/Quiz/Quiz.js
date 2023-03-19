import React, { useState } from 'react';
import styled from 'styled-components';

const questions = [
  { number: 1, title: '你的感情狀態', options: ['單身', '有伴', '不好說'] },
  { number: 2, title: '你的穿搭風格', options: ['帥氣', '氣質', '中性'] },
  { number: 3, title: '你喜歡的顏色', options: ['彩色', '黑色', '白色'] },
  {
    number: 4,
    title: '當收到禮物時，你的反應是',
    options: ['開心', '靦腆', '立刻打開給予評價'],
  },
  {
    number: 5,
    title: '在巴黎香榭大道上，看到一對擁吻的情侶，你覺得他們身分可能是？',
    options: ['老闆', '學生', '咖啡廳員工'],
    noBorder: true,
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1331px;
  margin: 100px auto 50px;
  color: #3f3a3a;
`;

const MainContent = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 6.4px;
  margin-bottom: 29px;
  font-weight: 700;
`;

const ContentContainer = styled.form`
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
  border-bottom: ${(props) => props.borderBottom};
`;

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 36px;
  margin-bottom: 36px;
`;

const NumberIcon = styled.div`
  width: 55px;
  height: 55px;
  background-color: black;
  border-radius: 50%;
  position: relative;
`;

const NumberText = styled.p`
  font-size: 24px;
  color: white;
  font-weight: 700;
  position: absolute;
  height: 38px;
  line-height: 38px;
  top: 6px;
  left: 21px;
`;

const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const QuestionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 6.4px;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 35px;
  justify-content: flex-start;
`;

const Options = styled.div`
  display: flex;
  height: 26px;
  gap: 8px;
`;

const CheckInput = styled.input`
  width: 16px;
  height: 16px;
`;

const CheckLabel = styled.label`
  line-height: 26px;
`;

const SubmitBtn = styled.button`
  box-sizing: border-box;
  width: 275px;
  height: 64px;
  background-color: black;
  font-size: 20px;
  color: white;
  line-height: 30px;
  letter-spacing: 4px;
  text-align: center;
  cursor: pointer;
  border: 0;
`;

export default function Quiz() {
  const [userInput, setUserInput] = useState({});

  function handleInput(e, item) {
    const newAnswer = { ...userInput, [`q${item}`]: e.target.value };
    setUserInput(newAnswer);
  }

  function getUserInputArray(obj) {
    return Object.values(obj);
  }

  function sendUserData(data) {
    fetch('https://www.gotolive.online/api/1.0/user/quiz', {
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJTYW0xMjMiLCJlbWFpbCI6InNhbWNoYW4xMjQ1QGdtYWlsLmNvbSIsInBpY3R1cmUiOm51bGwsImlkIjoxMDI5MywiaWF0IjoxNjc5MjEwODcxfQ.PO4gxjBLVlcDq7_vz3InLBqkhX4ve3pf4vTBa55CVjw',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: data }),
    })
      .then((res) =>
        res.status === 200 ? console.log('Success!') : console.log('Error!')
      )
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendUserData(getUserInputArray(userInput));
  }

  return (
    <Wrapper>
      <Title>HAVE FUN !</Title>
      <MainContent onSubmit={(e) => handleSubmit(e)}>
        <ContentContainer>
          <Content>
            {questions.map((question) => {
              return (
                <ContentRow
                  borderBottom={question.noBorder ? 0 : '1px solid black'}
                >
                  <QuestionContainer>
                    <NumberIcon>
                      <NumberText>{question.number}</NumberText>
                    </NumberIcon>
                    <QuestionContent>
                      <QuestionTitle>{question.title}</QuestionTitle>
                      <OptionContainer>
                        {question.options.map((option, index) => {
                          return (
                            <Options key={`${question.number}-${index}`}>
                              <CheckInput
                                type='radio'
                                name={`question-${question.number}`}
                                value={index.toString()}
                                checked={
                                  userInput[`q${question.number}`] ===
                                  index.toString()
                                }
                                onChange={(e) => {
                                  handleInput(e, question.number);
                                }}
                              ></CheckInput>
                              <CheckLabel>{option}</CheckLabel>
                            </Options>
                          );
                        })}
                      </OptionContainer>
                    </QuestionContent>
                  </QuestionContainer>
                </ContentRow>
              );
            })}
          </Content>
        </ContentContainer>
        <SubmitBtn type='submit'>READY TO SWIPE!</SubmitBtn>
      </MainContent>
    </Wrapper>
  );
}
