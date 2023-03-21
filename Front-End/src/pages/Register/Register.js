import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import profile from './profile.png';

const questions = [
  { value: 'name', label: '姓名' },
  { value: 'phone', label: '手機' },
  { value: 'email', label: '信箱' },
  { value: 'password', label: '密碼' },
];

const Wrapper = styled.div`
  width: 60%;
  border: 1px solid black;
  border-radius: 25px;
  margin: 50px auto 50px;
  padding: 63px 0 10px;
  color: #3f3a3a;
  @media screen and (max-width: 1279px) {
    width: 80%;
    padding-top: 20px;
  }
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
  @media screen and (max-width: 1279px) {
    flex-direction: column-reverse;
    margin-bottom: 15px;
    gap: 0px;
    justify-content: center;
    align-items: center;
  }
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
  width: 80%;
  margin-bottom: 40px;
`;

const InfoContainer = styled.div`
  width: 80%;
  margin-bottom: 63px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const InfoRow = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const QuestionTitle = styled.label`
  width: 120px;
  line-height: 19px;
  margin-right: 5px;
`;

const QuestionInput = styled.input`
  box-sizing: border-box;
  width: 100%;
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
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 30px;
  letter-spacing: 4px;
  border: 0;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    height: 44px;
  }
`;

export default function Register() {
  const [userData, setUserData] = useState({});

  function saveUserInput(e, obj) {
    const key = obj.value;
    const userInput = e.target.value;
    const newUserData = { ...userData, [key]: userInput };
    setUserData(newUserData);
  }

  function SendUserData() {
    if (
      !Object.keys(userData).length ||
      Object.keys(userData).length < 4 ||
      Object.values(userData).some((answer) => answer === '')
    ) {
      alert('Please do not leave any questions empty');
      return;
    }
    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    fetch('https://www.gotolive.online/api/1.0/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.status === 200
          ? res.json()
          : res.status === 403
          ? alert('The email address has already been registered')
          : console.log('error!')
      )
      .then((data) => {
        const token = data.data.access_token;
        localStorage.setItem('loginToken', token);
        window.location.href = './quiz';
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    // if (Object.keys.length(userData < 4)) {
    //   e.preventDefault();
    //   alert('Please do not leave any questions empty');
    // }
    e.preventDefault();
    SendUserData();
  }

  useEffect(() => {
    console.log(Object.values(userData));
  }, [userData]);

  return (
    <Wrapper>
      <ContentContainer onSubmit={(e) => handleSubmit(e)}>
        <Title>
          <TitleText>會員註冊</TitleText>
          <ProfileIcon />
        </Title>
        <SplitLine />
        <InfoContainer>
          {questions.map((question, index) => (
            <InfoRow key={index}>
              <QuestionTitle>{question.label}</QuestionTitle>
              <QuestionInput onChange={(e) => saveUserInput(e, question)} />
            </InfoRow>
          ))}
        </InfoContainer>
        <SubmitBtn type='submit'>玩個小遊戲！</SubmitBtn>
      </ContentContainer>
    </Wrapper>
  );
}
