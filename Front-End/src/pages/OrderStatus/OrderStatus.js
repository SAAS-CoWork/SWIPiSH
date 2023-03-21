import React from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import profile from "./profile.png";
import profilechoose from "./profilechoose.png";
import fav from "./fav.png";
import favchoose from "./favchoose.png";
import cart from "./cart.png";
import cartchoose from "./cartchoose.png";
import conversation from "./conversation.png";
import star from "./star.png";
import goldstar from "./goldstar.png";

import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  border: 2px solid #3f3a3a;
  margin: 100px 180px 50px;
  @media screen and (max-width: 1279px) {
    margin: 100px 50px 50px;
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
  width: 37.17px;
  height: 35.53px;
  background-image: url(${cart});
  margin-top: 50px;
  @media screen and (max-width: 1279px) {
    display: none;
  }
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
  background: #3f3a3a;
  border: #3f3a3a solid 2px;
  color: #ffffff;
  font-size: 24px;
  letter-spacing: 6.4px;
  cursor: pointer;
  a {
    color: #ffffff;
    text-decoration: none;
    &:hover,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const MemberButton2 = styled.button`
  width: 272px;
  height: 61px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #ffffff;
  border-right: #3f3a3a solid 2px;
  border-top: #3f3a3a solid 2px;
  border-left: #3f3a3a solid 2px;
  border-bottom: #ffffff solid 2px;
  color: #3f3a3a;
  font-size: 24px;
  letter-spacing: 6.4px;
  cursor: pointer;
  a {
    color: #3f3a3a;
    text-decoration: none;
    &:hover,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const MemberButton3 = styled.button`
  width: 272px;
  height: 61px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #3f3a3a;
  border: #3f3a3a solid 2px;
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
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const MemberNavMobile = styled.div`
  @media screen and (min-width: 1279px) {
    display: none;
  }
  @media screen and (max-width: 1279px) {
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-between;
    align-items: center;
    align-self: center;
  }
`;

const MemberButton = styled.div`
  @media screen and (min-width: 1279px) {
    display: none;
  }
  @media screen and (max-width: 1279px) {
    background-image: url(${(props) => props.bgImage});
    height: 35px;
    width: 35px;
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
  }
`;

const FavButton = styled.div`
  @media screen and (min-width: 1279px) {
    display: none;
  }
  @media screen and (max-width: 1279px) {
    background-image: url(${(props) => props.bgImage});
    height: 32px;
    width: 38px;
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
  }
`;

const CartButton = styled.div`
  @media screen and (min-width: 1279px) {
    display: none;
  }
  @media screen and (max-width: 1279px) {
    background-image: url(${(props) => props.bgImage});
    height: 35px;
    width: 35px;
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
  }
`;

const ChartWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  border: 2px solid #3f3a3a;
  margin: 160px 180px 110px;
  align-self: center;
  margin-top: 0px;
`;

const ChartTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #3f3f3a;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
`;

const ChartTitle = styled.p`
  width: 116px;
  height: 38px;
  font-weight: 400;
  font-size: 18px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #ffffff;
  margin: 23px auto;
  white-space: nowrap;
`;

const OrderStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 2px solid #3f3f3a;
  padding-top: 28px;
  padding-bottom: 28px;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
`;

const OrderNum = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
  font-weight: 700;
`;

const ShipStatus = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
`;

const OrderPrize = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
`;

const OrderRequest = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
`;

const CustomerService = styled.div`
  background-image: url(${conversation});
  background-color: #ffffff;
  width: 32px;
  height: 31px;
  margin-right: 24px;
  margin-left: 28px;
  cursor: pointer;
`;

const Review = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: repeat-x;
  cursor: pointer;
  width: 140px;
  height: 25px;
`;

function SingleOrderStatus() {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    setIsFilled(!isFilled);
  };
  return (
    <OrderStatusWrapper>
      <OrderNum>0012123</OrderNum>
      <ShipStatus>出貨處理</ShipStatus>
      <OrderPrize>NT.1200</OrderPrize>
      <OrderRequest>尚未申請</OrderRequest>
      <CustomerService></CustomerService>
      <Review
        backgroundImage={isFilled ? goldstar : star}
        onClick={handleClick}
      ></Review>
    </OrderStatusWrapper>
  );
}

export default function OrderStatus() {
  const [profileBgImage, setProfileBgImage] = useState(profile);
  const [favBgImage, setFavBgImage] = useState(fav);
  const [orderBgImage, setOrderBgImage] = useState(cart);
  const handleProfileClick = () => {
    setProfileBgImage(profilechoose);
  };
  const handleFavClick = () => {
    setFavBgImage(favchoose);
  };
  const handleOrderClick = () => {
    setOrderBgImage(cartchoose);
  };
  return (
    <Wrapper>
      <MemberNav>
        <MemberButton1>
          <Link to="/Profile">會員資料</Link>
        </MemberButton1>
        <MemberButton3>
          <Link to="/FavProducts">收藏商品</Link>
        </MemberButton3>
        <MemberButton2>
          <Link to="/OrderStatus">訂單狀態</Link>
        </MemberButton2>
      </MemberNav>
      <MemberNavMobile>
        <Link to="/Profile">
          <MemberButton
            bgImage={profileBgImage}
            onClick={handleProfileClick}
          ></MemberButton>
        </Link>
        <Link to="/FavProducts">
          <FavButton bgImage={favBgImage} onClick={handleFavClick}></FavButton>
        </Link>
        <Link to="/OrderStatus">
          <CartButton
            bgImage={orderBgImage}
            onClick={handleOrderClick}
          ></CartButton>
        </Link>
      </MemberNavMobile>
      <Title>
        <Titletext>訂單狀態</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <ChartWrapper>
        <ChartTitleWrapper>
          <ChartTitle>訂單編號</ChartTitle>
          <ChartTitle>出貨狀態</ChartTitle>
          <ChartTitle>訂單價格</ChartTitle>
          <ChartTitle>退貨退款</ChartTitle>
          <ChartTitle>客戶服務</ChartTitle>
          <ChartTitle>商品評價</ChartTitle>
        </ChartTitleWrapper>
        <SingleOrderStatus></SingleOrderStatus>
        <SingleOrderStatus></SingleOrderStatus>
      </ChartWrapper>
    </Wrapper>
  );
}
