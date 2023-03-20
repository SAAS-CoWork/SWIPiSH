import React from 'react';
import styled from 'styled-components';
import profile from './profile.png';
import GooglePayBtn from '../../utils/GooglePay';

const paymentInfo = [
  { title: '信用卡號碼', description: '**** **** **** ****' },
  { title: '有效期限碼', description: 'MM /YY' },
  { title: '安全碼', description: '後三碼' },
];

const plans = [
  { title: 'Premium', price: '$4.99USD / Month' },
  { title: 'Platinum', price: '$49.99USD / Year' },
];

const Wrapper = styled.div`
  width: 1331px;
  border: 1px solid black;
  border-radius: 25px;
  margin: 100px auto 50px;
  padding: 63px 0 10px;
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
  margin-bottom: 50px;
`;

const InfoContainer = styled.div`
  width: 696px;
  margin-bottom: 97px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
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

const Plans = styled.div`
  display: flex;
  gap: 21px;
`;

const PlanContainer = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
`;

const PlanSelect = styled.input`
  width: 16px;
  height: 16px;
`;

const PlanTitle = styled.h2`
  color: #8b572a;
  font-weight: 700;
  line-height: 26px;
`;

const PlanPrice = styled.p`
  line-height: 26px;
`;

const QuestionInput = styled.input`
  box-sizing: border-box;
  width: 576px;
  height: 32px;
  padding-left: 8px;
  border-radius: 8px;
  border: 1px solid #979797;
  &::placeholder {
    color: #d3d3d3;
  }
`;

export default function Subscription() {
  return (
    <Wrapper>
      <ContentContainer>
        <Title>
          <TitleText>成為尊榮會員</TitleText>
          <ProfileIcon />
        </Title>
        <SplitLine />
        <InfoContainer>
          <InfoRow>
            <QuestionTitle>訂閱方案</QuestionTitle>
            <Plans>
              {plans.map((plan) => (
                <PlanContainer>
                  <PlanSelect type='radio' />
                  <PlanTitle>{plan.title}</PlanTitle>
                  <PlanPrice>{plan.price}</PlanPrice>
                </PlanContainer>
              ))}
            </Plans>
          </InfoRow>
          {paymentInfo.map((info) => (
            <InfoRow>
              <QuestionTitle>{info.title}</QuestionTitle>
              <QuestionInput placeholder={info.description} />
            </InfoRow>
          ))}
          <GooglePayBtn />
        </InfoContainer>
      </ContentContainer>
    </Wrapper>
  );
}
