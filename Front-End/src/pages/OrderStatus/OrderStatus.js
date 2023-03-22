import React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import profile from './profile.png';
import fav from './fav.png';
import cart from './cart.png';
import cartchoose from './cartchoose.png';
import conversation from './conversation.png';
import conversationchoose from './conversationchoose.png';
import star from './star.png';
import goldstar from './goldstar.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
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
  @media screen and (max-width: 1279px) {
    margin-top: 0px;
  }
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
    justify-content: center;
    align-items: center;
    align-self: center;
    gap: 80px;
  }
`;

const MemberButton = styled.div`
  @media screen and (min-width: 1279px) {
    display: none;
  }
  @media screen and (max-width: 1279px) {
    background-image: url(${profile});
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
    background-image: url(${fav});
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
    background-image: url(${cartchoose});
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
  @media screen and (max-width: 1279px) {
    border: none;
    border-radius: none;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    width: 261px;
  }
`;

const ChartTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #3f3f3a;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  @media screen and (max-width: 1279px) {
    border: none;
    border-radius: 0;
    background: #ffffff;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;
  }
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
  @media screen and (max-width: 1279px) {
    color: #3f3f3a;
    font-weight: 700;
    margin: 0;
  }
`;

const OrderStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 2px solid #3f3f3a;
  padding-top: 28px;
  padding-bottom: 28px;
  align-items: center;
  border-bottom: none;
  align-content: flex-start;
  padding-top: 30px;
  padding-bottom: 30px;
  @media screen and (max-width: 1279px) {
    border-bottom: 2px solid #3f3f3a;
    padding-top: 28px;
    padding-bottom: 28px;
    align-items: center;
    border-bottom: none;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0;
    justify-content: flex-start;
  }
`;

const OrderNum = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 3px;
  color: #3f3a3a;
  white-space: nowrap;
  font-weight: 700;
  @media screen and (max-width: 1279px) {
    margin-bottom: 14px;
  }
`;

const ShipStatus = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
  @media screen and (max-width: 1279px) {
    margin-bottom: 14px;
  }
`;

const OrderPrize = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
  @media screen and (max-width: 1279px) {
    margin-bottom: 14px;
  }
`;

const OrderRequest = styled.p`
  width: 116px;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  white-space: nowrap;
  @media screen and (max-width: 1279px) {
    margin-bottom: 14px;
  }
`;

const CustomerService = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-color: #ffffff;
  width: 32px;
  height: 31px;
  margin-right: 24px;
  margin-left: 28px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 24px;
    margin-top: 10px;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 135px;
`;

const Review = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  cursor: pointer;
  width: 28px;
  height: 26px;
  @media screen and (max-width: 1279px) {
    margin-bottom: 0px;
  }
`;

function SingleOrderStatus() {
  const db = [
    { id: 123456789123, price: 1200 },
    { id: 123456789123, price: 1200 },
    { id: 123456789123, price: 1200 },
  ];
  const orderNumber = localStorage.getItem('orderNumber');
  const navigate = useNavigate();
  const [conversationBgImage, setConversationBgImage] = useState(conversation);
  const handleConversationClick = () => {
    setConversationBgImage(conversationchoose);
    navigate('/customerservice');
  };
  const [stars, setStars] = useState([
    { id: 1, isFilled: false },
    { id: 2, isFilled: false },
    { id: 3, isFilled: false },
    { id: 4, isFilled: false },
    { id: 5, isFilled: false },
  ]);

  function handleClick(starId) {
    const updatedStars = stars.map((star) => {
      if (star.id <= starId) {
        return { ...star, isFilled: true };
      } else {
        return { ...star, isFilled: false };
      }
    });
    setStars(updatedStars);
  }

  return db.map((item) => (
    <OrderStatusWrapper>
      <OrderNum>{item.id}</OrderNum>
      <ShipStatus>出貨處理</ShipStatus>
      <OrderPrize>{item.price}</OrderPrize>
      <OrderRequest>尚未申請</OrderRequest>
      <CustomerService
        bgImage={conversationBgImage}
        onClick={handleConversationClick}
      ></CustomerService>
      <ReviewContainer>
        {stars.map((item) => (
          <Review
            key={item.id}
            backgroundImage={item.isFilled ? goldstar : star}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </ReviewContainer>
    </OrderStatusWrapper>
  ));
}

export default function OrderStatus() {
  return (
    <Wrapper>
      <MemberNav>
        <MemberButton1>
          <Link to='/Profile'>會員資料</Link>
        </MemberButton1>
        <MemberButton3>
          <Link to='/FavProducts'>收藏商品</Link>
        </MemberButton3>
        <MemberButton2>
          <Link to='/OrderStatus'>訂單狀態</Link>
        </MemberButton2>
      </MemberNav>
      <MemberNavMobile>
        <Link to='/Profile'>
          <MemberButton></MemberButton>
        </Link>
        <Link to='/FavProducts'>
          <FavButton></FavButton>
        </Link>
        <Link to='/OrderStatus'>
          <CartButton></CartButton>
        </Link>
      </MemberNavMobile>
      <Title>
        <Titletext>訂單狀態</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <Splict></Splict>
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
      </ChartWrapper>
    </Wrapper>
  );
}
