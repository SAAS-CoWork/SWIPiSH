import React from "react";
import styled from "styled-components/macro";
import profile from "./profile.png";

const paymentInfo = [
  { title: "信用卡號", description: "**** **** **** ****" },
  { title: "有效期限", description: "MM /YY" },
  { title: "安全碼", description: "後三碼" },
];

const plans = [
  { title: "Premium", price: "$4.99USD / Month" },
  { title: "Platinum", price: "$49.99USD / Year" },
];

const Wrapper = styled.div`
  width: 60%;
  border: 1px solid black;
  border-radius: 25px;
  margin: 100px auto 50px;
  padding: 63px 0 79px;
  color: #3f3a3a;
  margin-top: 50px;
  padding-top: 63px;
  padding-bottom: 10px;
  @media screen and (max-width: 1279px) {
    width: 80%;
    border: 1px solid black;
    border-radius: 25px;
    margin: 100px auto 50px;
    padding: 63px 0 79px;
    color: #3f3a3a;
    margin-top: 50px;
    padding-top: 20px;
    padding-bottom: 10px;
  }
`;

const ContentContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justigy-content: center;
  flex-direction: row;
  align-items: center;
  margin-bottom: 34px;
  gap:15px;
  @media screen and (max-width: 1279px) {
    flex-direction: column-reverse;
    margin-bottom: 15px;
    gap:0px;
  }
`;

const TitleText = styled.h1`
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 6.4px;
  font-weight: 700;
  @media screen and (max-width: 1279px) {
    font-size: 24px;
  }
`;

const ProfileIcon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${profile});
`;

const SplitLine = styled.hr`
  width: 80%;
  margin-bottom: 91px;

  margin-bottom: 40px;
  margin-top: 0px;
`;

const InfoContainer = styled.div`
  width: 65%;
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (max-width: 1279px) {
    width: 85%;
    margin-bottom: 45px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
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
  @media screen and (max-width: 1279px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  @media screen and (max-width: 1279px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
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
  width: 100%;
  height: 32px;
  margin-left: 8px;
  border-radius: 8px;
  border: 1px solid #979797;
  &::placeholder {
    color: #d3d3d3;
  }
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
  @media screen and (max-width: 1279px) {
    height: 44px;
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
                  <PlanSelect type="radio" />
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
        </InfoContainer>
        <SubmitBtn>SUBSCRIBE!</SubmitBtn>
      </ContentContainer>
    </Wrapper>
  );
}
