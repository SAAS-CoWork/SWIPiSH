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

const productInfo = {
  title: '前開衩扭結洋裝',
  price: 799,
  colors: ['FFFFF', 'DDFFBB', 'D3D3D3'],
  img: product,
};

const collections = Array.from({ length: 6 }, () => ({ ...productInfo }));

const displayedProduct = { title: '前開衩扭結洋裝', price: 799 };

const Collection = styled.div`
  width: 651px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwipeZone = styled.div`
  width: 660px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 660px;
  height: 796px;
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 38px 0 73px;
  gap: 24px;
`;

const SwipeImg = styled.div`
  width: 427px;
  height: 569px;
  background-image: url(${product});
  background-size: cover;
  background-repeat: no-repeat;
`;

const SwipeTitle = styled.h2`
  font-size: 32px;
  letter-spacing: 4px;
  font-weight: 700;
`;

const SwipePrice = styled.h3`
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 4px;
`;

const LikeBtnContainer = styled.div`
  width: 461px;
  display: flex;
  gap: 82px;
`;

const LikeBtn = styled.button`
  width: 99px;
  height: 99px;
  background-image: url(${(props) => props.imgUrl});
  border: 0;
  background-color: white;
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
  background-image: url(${(props) => props.imgUrl});
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
  background-color: ${(props) => props.backgroundColor};
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
          {collections.map((product, index) => (
            <ProductContainer key={index}>
              <ProductImg imgUrl={product.img} />
              <ProductInfoContainer>
                <ProductInfo>
                  <ColorContainer>
                    {product.colors.map((color) => (
                      <Color backgroundColor={`#${color}`}></Color>
                    ))}
                  </ColorContainer>
                  <InfoText>{product.title}</InfoText>
                  <InfoText>TWD. {product.price}</InfoText>
                </ProductInfo>
                <RemoveIcon></RemoveIcon>
              </ProductInfoContainer>
            </ProductContainer>
          ))}
        </Products>
      </Collection>
      <SwipeZone>
        <ContentContainer>
          <SwipeImg />
          <SwipeTitle>{displayedProduct.title}</SwipeTitle>
          <SwipePrice>TWD.{displayedProduct.price}</SwipePrice>
        </ContentContainer>
        <LikeBtnContainer>
          <LikeBtn imgUrl={notLike} />
          <LikeBtn imgUrl={superLike} />
          <LikeBtn imgUrl={like} />
        </LikeBtnContainer>
      </SwipeZone>
    </Wrapper>
  );
}
