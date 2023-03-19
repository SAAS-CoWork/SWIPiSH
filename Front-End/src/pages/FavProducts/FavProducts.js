import React from "react";
import styled from "styled-components";
import fav from "./fav.png";
import trash from "./trash.png";
import dress from "./dress.png";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius:25px;
  border: 2px solid #3F3A3A;
  margin: 160px 180px;
  @media screen and (max-width: 1279px) {
    ${'' /* 手機還沒切 */}
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
`;

const Titletext = styled.h1`
  margin-top: 91px;
  text-align: center;
  font-size: 24px;
  line-height: 38px;
  font-weight: 700;
  letter-spacing: 6.4px;
  color: #3f3f3a;
`;

const FavIcon = styled.div`
  width: 37.17px;
  height: 32.53px;
  background-image: url(${fav});
  margin-top: 93px;
`;

const MemberNav = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 10;
  margin-top: -60.5px;
  padding-left: 50px;
`;

const MemberButton1 = styled.button`
  width: 272px;
  height: 61px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #3F3A3A;
  border: #3F3A3A solid 2px;
  color: #ffffff;
  font-size: 24px;
  letter-spacing: 6.4px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #ffffff;
    &:hover,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`;

const MemberButton2 = styled.button`
  width: 272px;
  height: 61px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #ffffff;
  border-right: #3F3A3A solid 2px;
  border-top: #3F3A3A solid 2px;
  border-left: #3F3A3A solid 2px;
  border-bottom: #ffffff solid 2px;
  color: #3F3A3A;
  font-size: 24px;
  letter-spacing: 6.4px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #3F3A3A;
    &:hover,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`;

const MemberButton3 = styled.button`
  width: 272px;
  height: 61px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #3F3A3A;
  border: #3F3A3A solid 2px;
  color: #ffffff;
  font-size: 24px;
  letter-spacing: 6.4px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #ffffff;
    &:hover,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: 150px;
  padding-left: 150px;
  gap: 35px;
  margin-top: 51px;
  margin-bottom: 110px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductImg = styled.div`
  width: 239px;
  height: 326px;
  background-image: url(${dress});
  cursor: pointer;
`;

const ProductDetail = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ProductTitle = styled.p`
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: #3F3A3A;
`;

const ProductPrice = styled.p`
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: #3F3A3A;
`;

const Delete = styled.div`
  background-image: url(${trash});
  width: 49px;
  height: 50px;
  top: 40px;
  cursor: pointer;
`;

function ProductItem() {
  return (
    <ProductContainer>
      <ProductImg></ProductImg>
      <ProductDetail>
        <ProductTitle>前開衩扭結洋裝</ProductTitle>
        <ProductPrice>TWD.799</ProductPrice>
        <Delete></Delete>
      </ProductDetail>
    </ProductContainer>
  );
}

export default function FavProducts() {
  return (
    <Wrapper>
      <MemberNav>
        <MemberButton1>
          <Link to="/Profile">會員資料</Link>
        </MemberButton1>
        <MemberButton2>
          <Link to="/FavProducts">收藏商品</Link>
        </MemberButton2>
        <MemberButton3>
          <Link to="/OrderStatus">訂單狀態</Link>
        </MemberButton3>
      </MemberNav>
      <Title>
        <Titletext>收藏商品</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <ProductItemContainer>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
      </ProductItemContainer>
    </Wrapper>
  );
}
