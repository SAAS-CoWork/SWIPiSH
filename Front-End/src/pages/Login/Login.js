<<<<<<< HEAD
import React, { useState } from "react";
import styled from "styled-components";
import profile from "./profile.png";
=======
import React, { useState } from 'react';
import styled from 'styled-components';
import profile from './profile.png';
>>>>>>> bfbc045449febe63dd95a2394b20db83863492c4

const questions = [
  { value: 'email', label: '信箱' },
  { value: 'password', label: '密碼' },
];

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 1331px;
  height: 529px;
  margin: 100px auto 50px;
  border: 1px solid black;
  border-radius: 25px;
  color: #3f3a3a;
`;

const ContentContainer = styled.form`
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

const LoginRow = styled.div`
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

const BtnContainer = styled.div`
  width: 941px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 50px;
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
  cursor: pointer;
`;

export default function Login() {
<<<<<<< HEAD
  const [userData, setUserData] = useState({});

  function saveUserInput(e) {
    const key = e.target.name;
    const userInput = e.target.value;
    const newUserData = { ...userData, [key]: userInput };
    setUserData(newUserData);
  }

  function SendUserData() {
    const data = {
      email: userData.email,
      password: userData.password,
    };
    console.log(data);

    fetch("https://www.gotolive.online/api/1.0/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJTYW0xMjMiLCJlbWFpbCI6InNhbWNoYW4xMjQ1QGdtYWlsLmNvbSIsInBpY3R1cmUiOm51bGwsImlkIjoxMDI5MywiaWF0IjoxNjc5MjEwODcxfQ.PO4gxjBLVlcDq7_vz3InLBqkhX4ve3pf4vTBa55CVjw",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.status === 200 ? console.log("Success!") : console.log("Error!")
      )
=======
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
>>>>>>> bfbc045449febe63dd95a2394b20db83863492c4
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    SendUserData();
=======
    getJWT(userInput);
  }

  function signUp() {
    window.location.href = './register';
>>>>>>> bfbc045449febe63dd95a2394b20db83863492c4
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
<<<<<<< HEAD
          <LoginRow>
            <LoginInfoTitle>帳號</LoginInfoTitle>
            <LoginInput
              name="email"
              value={userData.email}
              onChange={(e) => saveUserInput(e)}
            />
          </LoginRow>
          <LoginRow>
            <LoginInfoTitle>密碼</LoginInfoTitle>
            <LoginInput
              name="password"
              value={userData.password}
              onChange={(e) => saveUserInput(e)}
            />
          </LoginRow>
        </LoginInfoContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <LoginBtn type="submit">登入</LoginBtn>
        </form>
=======
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
            成為會員
          </LoginBtn>
        </BtnContainer>
>>>>>>> bfbc045449febe63dd95a2394b20db83863492c4
      </ContentContainer>
    </Wrapper>
  );
}
