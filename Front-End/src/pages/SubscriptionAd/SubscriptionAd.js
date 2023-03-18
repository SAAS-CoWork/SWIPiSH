import React from 'react';
import styled from 'styled-components';
import medal from './medal.png';

const planDescription = ['懶人購物首選', '客製專屬推薦', '會員優惠價格'];

const Wrapper = styled.div`
  width: 1031px;
  margin: 50px auto 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
  font-size: 24px;
  line-height: 38px;
  font-weight: 700;
  letter-spacing: 6.4px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 506px;
  display: flex;
  justify-content: space-between;
  gap: 121px;
  margin-bottom: 50px;
`;

const PlanContainer = styled.div`
  box-sizing: border-box;
  width: 455px;
  height: 506px;
  border: 2px solid black;
`;

const PlanContent = styled.div`
  width: 238px;
  margin: 65px auto 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlanTitle = styled.h2`
  width: 153px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 6.4px;
  margin-bottom: 19px;
`;

const SplitLine = styled.hr`
  width: 83px;
  border: 1px solid #3f3a3a;
  margin-bottom: 49px;
`;

const PriceContainer = styled.div`
  width: 100%;
  margin-bottom: 49px;
`;

const Price = styled.h3`
  font-size: 40px;
  color: #8b572a;
  font-weight: 700;
  letter-spacing: 6.4px;
  margin-bottom: 5px;
`;

const PriceDescription = styled.div`
  width: 100%;
  font-size: 24px;
  line-height: 38px;
  font-weight: 700;
  color: #979797;
  letter-spacing: 2.9px;
  text-align: center;
`;

const PlanDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const PlanDescriptionRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 19.58px;
`;

const PointIcon = styled.div`
  width: 25.42px;
  height: 25.42px;
  font-size: 25.42px;
`;

const PlanDescriptionText = styled.p`
  font-size: 20px;
  line-height: 38px;
  letter-spacing: 6.4px;
  font-weight: ${(props) => props.fontWeight};
`;

const MedalImg = styled.div`
  width: 55px;
  height: 83px;
  background-image: url(${medal});
  margin-top: 14px;
`;

const LearnMoreBtn = styled.button`
  width: 240px;
  height: 64px;
  background-color: black;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: white;
  text-align: center;
  border: 0;
`;

export const SubscriptionAd = () => {
  return (
    <Wrapper>
      <Title>Revolutionize Your Shopping Experience!</Title>
      <ContentContainer>
        <PlanContainer>
          <PlanContent>
            <PlanTitle>PREMIUM</PlanTitle>
            <SplitLine></SplitLine>
            <PriceContainer>
              <Price>$4.99USD</Price>
              <PriceDescription>Per Month</PriceDescription>
            </PriceContainer>
            <PlanDescriptionContainer>
              {planDescription.map((item) => {
                return (
                  <PlanDescriptionRow>
                    <PointIcon>➜</PointIcon>
                    <PlanDescriptionText>{item}</PlanDescriptionText>
                  </PlanDescriptionRow>
                );
              })}
            </PlanDescriptionContainer>
          </PlanContent>
        </PlanContainer>
        <PlanContainer>
          <PlanContent>
            <PlanTitle>PLATINUM</PlanTitle>
            <SplitLine></SplitLine>
            <PriceContainer>
              <Price>$49.99USD</Price>
              <PriceDescription>Per Year</PriceDescription>
            </PriceContainer>
            <PlanDescriptionContainer>
              <PlanDescriptionText fontWeight={700}>
                更尊榮的體驗
              </PlanDescriptionText>
              <MedalImg></MedalImg>
            </PlanDescriptionContainer>
          </PlanContent>
        </PlanContainer>
      </ContentContainer>
      <LearnMoreBtn>LEARN MORE</LearnMoreBtn>
    </Wrapper>
  );
};
