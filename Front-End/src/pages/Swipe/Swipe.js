import React from 'react';
import styled from 'styled-components';
import heart from './heart.png';
import like from './like.png';
import notLike from './notLike.png';
import superLike from './superLike.png';
import trash from './trash.png';
import product from './product.png';

const Wrapper = styled.div`
  width: 1476px;
  margin: 100px auto 50px;
  display: flex;
  gap: 99px;
`;

const Collection = styled.div`
  width: 651px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 726px;
  height: 876px;
  border: 1px solid black;
  border-radius: 25px;
`;

const Title = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 29.93px;
`;

const TitleText = styled.h1`
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 6.4px;
  font-weight: 700;
`;

const TitleIcon = styled.div`
  width: 37.17px;
  height: 32.53px;
  background-image: url(${heart});
`;

const SplitLine = styled.hr`
  width: 651px;
  margin-bottom: 37px;
`;

const Products = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductImg = styled.div`
  width: 203px;
  height: 269px;
  background-image: url(${product});
  margin-bottom: 8px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const Color = styled.div`
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border: 1px solid #d3d3d3;
  background-color: #ddffbb;
`;

const InfoText = styled.p`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 2.4px;
`;

const RemoveIcon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${trash});
`;

export default function Swipe() {
  return (
    <Wrapper>
      <Collection>
        <Title>
          <TitleText>收藏商品</TitleText>
          <TitleIcon />
        </Title>
        <SplitLine />
        <Products>
          <ProductContainer>
            <ProductImg />
            <ProductInfoContainer>
              <ProductInfo>
                <ColorContainer>
                  <Color></Color>
                  <Color></Color>
                  <Color></Color>
                </ColorContainer>
                <InfoText>前開衩扭結洋裝</InfoText>
                <InfoText>TWD. 799</InfoText>
              </ProductInfo>
              <RemoveIcon></RemoveIcon>
            </ProductInfoContainer>
          </ProductContainer>
          <ProductContainer>
            <ProductImg />
            <ProductInfoContainer>
              <ProductInfo>
                <ColorContainer>
                  <Color></Color>
                  <Color></Color>
                  <Color></Color>
                </ColorContainer>
                <InfoText>前開衩扭結洋裝</InfoText>
                <InfoText>TWD. 799</InfoText>
              </ProductInfo>
              <RemoveIcon></RemoveIcon>
            </ProductInfoContainer>
          </ProductContainer>
          <ProductContainer>
            <ProductImg />
            <ProductInfoContainer>
              <ProductInfo>
                <ColorContainer>
                  <Color></Color>
                  <Color></Color>
                  <Color></Color>
                </ColorContainer>
                <InfoText>前開衩扭結洋裝</InfoText>
                <InfoText>TWD. 799</InfoText>
              </ProductInfo>
              <RemoveIcon></RemoveIcon>
            </ProductInfoContainer>
          </ProductContainer>
          <ProductContainer>
            <ProductImg />
            <ProductInfoContainer>
              <ProductInfo>
                <ColorContainer>
                  <Color></Color>
                  <Color></Color>
                  <Color></Color>
                </ColorContainer>
                <InfoText>前開衩扭結洋裝</InfoText>
                <InfoText>TWD. 799</InfoText>
              </ProductInfo>
              <RemoveIcon></RemoveIcon>
            </ProductInfoContainer>
          </ProductContainer>
        </Products>
      </Collection>
      <ContentContainer></ContentContainer>
    </Wrapper>
  );
}
