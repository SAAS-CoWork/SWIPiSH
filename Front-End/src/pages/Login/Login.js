import React, { useState } from 'react';
import styled from 'styled-components/macro';
import profile from './profile.png';

const questions = [
  { value: 'email', label: '信箱' },
  { value: 'password', label: '密碼' },
];

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 60%;
  margin: 50px auto 50px;
  border: 1px solid black;
  border-radius: 25px;
  color: #3f3a3a;
  @media screen and (max-width: 1279px) {
    width: 80%;
  }
`;

const ContentContainer = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 63px auto 50px;
  @media screen and (max-width: 1279px) {
    margin-top:20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  letter-spacing: 6.4px;
  font-weight: 700;
  line-height: 38px;
`;

const SplitLine = styled.hr`
  width:80%;
  margin: 0 0 40px;
`;

const LoginInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 80%;
  margin-bottom: 45px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const LoginRow = styled.div`
  width: 80%;
  display: flex;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    align-items: flex-start;
    gap:5px;
  }
`;

const LoginInfoTitleContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 34px;
  @media screen and (max-width: 1279px) {
    flex-direction: column-reverse;
    margin-bottom: 15px;
    gap:0px;
    justify-content:center;
    align-items:center;
  }
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
  width: 100%;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
`;

const BtnContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const LoginBtn = styled.button`
  width: 240px;
  height: 64px;
  background-color: black;
  border: 0;
  color: white;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    height: 44px;
  }
`;

export default function Login() {
  const [userInput, setUserInput] = useState({});

  function handleInput(e, data) {
    const inputData = { ...userInput, [data.value]: e.target.value };
    setUserInput(inputData);
  }

  function getJWT(data) {
    const jsonData = JSON.stringify({
      provider: 'native',
      email: data.email,
      password: data.password,
    });
    fetch('http://54.64.47.158:3001/api/1.0/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert('Incorrect email or password. Please try again.');
        }
      })
      .then((data) => {
        const token = data.data.access_token;
        localStorage.setItem('loginToken', token);
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    getJWT(userInput);
  }

  function signUp() {
    window.location.href = './register';
  }

  return (
    <Wrapper>
      <ContentContainer onSubmit={(e) => handleSubmit(e)}>
        <LoginInfoTitleContainer>
          <Title>會員登入</Title>
          <LoginIcon></LoginIcon>
        </LoginInfoTitleContainer>
        <SplitLine></SplitLine>
        <LoginInfoContainer>
          {questions.map((question, index) => (
            <LoginRow key={index}>
              <LoginInfoTitle>{question.label}</LoginInfoTitle>
              <LoginInput
                onChange={(e) => {
                  handleInput(e, question);
                }}
              ></LoginInput>
            </LoginRow>
          ))}
        </LoginInfoContainer>
        <BtnContainer>
          <LoginBtn type='submit'>登入</LoginBtn>
          <LoginBtn type='button' onClick={signUp}>
            註冊
          </LoginBtn>
        </BtnContainer>
      </ContentContainer>
    </Wrapper>
  );
}
