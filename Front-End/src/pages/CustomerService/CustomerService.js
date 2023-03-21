// import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import conversation from './conversation.png';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  border: 2px solid #3f3a3a;
  margin: 100px 180px 50px;
  @media screen and (max-width: 1279px) {
    margin: 50px 50px 50px;
    border: none;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
`;

const Titletext = styled.h1`
  margin-top: 50px;
  margin-bottom: 48px;
  text-align: center;
  font-size: 24px;
  line-height: 38px;
  font-weight: 700;
  letter-spacing: 6.4px;
  color: #3f3f3a;
  @media screen and (max-width: 1279px) {
    margin-bottom: 30px;
  }
`;

const FavIcon = styled.div`
  width: 33px;
  height: 31px;
  background-image: url(${conversation});
  margin-top: 54px;
`;

const Splict = styled.div`
  border-top: 1px solid #3f3a3a;
  width: 80%;
  margin-bottom: 74px;
  align-self: center;
  @media screen and (max-width: 1279px) {
    margin-bottom: 40px;
  }
`;

const ConversationContainer = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  margin-bottom: 45px;
  @media screen and (max-width: 1279px) {
    width: 80%;
  }
`;

const ConversationTitle = styled.h2`
  width: 120px;
  line-height: 29px;
`;

const ConversationInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
`;

const ContentInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border: 1px solid #979797;
  border-radius: 8px;
  input {
    text-align: center;
  }
`;

const BtnContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SubmitBtn = styled.button`
  width: 240px;
  height: 64px;
  background-color: black;
  border: 0;
  color: white;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 50px;
  @media screen and (max-width: 1279px) {
    height: 44px;
  }
`;

export default function CustomerService() {
  const titleRef = useRef(undefined);
  const textRef = useRef(undefined);
  const questions = useRef([titleRef, textRef]);
  const [userInput, setUserInput] = useState({});
  const jwt = localStorage.getItem('loginToken');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const userInput = {
      title: titleRef.current.value,
      text: textRef.current.value,
    };
    setUserInput(userInput);
    saveInput();
  }

  function saveInput() {
    fetch('https://www.gotolive.online/api/1.0/service/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    })
      .then((res) =>
        res.status === 200
          ? alert('Successfully Submitted!')
          : alert('Please try again')
      )
      .catch((err) => console.log(err));
  }

  if (!jwt) {
    navigate('/login');
  }

  return (
    <Wrapper
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Title>
        <Titletext>聯絡我們</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <Splict></Splict>
      <ConversationContainer>
        <ConversationTitle>主旨</ConversationTitle>
        <ConversationInput ref={titleRef}></ConversationInput>
        <ConversationTitle>內容</ConversationTitle>
        <ContentInput ref={textRef}></ContentInput>
      </ConversationContainer>
      <BtnContainer>
        <SubmitBtn>確認送出</SubmitBtn>
      </BtnContainer>
    </Wrapper>
  );
}
