import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import profile from "./profile.png";
import profilechoose from "./profilechoose.png";
import fav from "./fav.png";
import favchoose from "./favchoose.png";
import cart from "./cart.png";
import cartchoose from "./cartchoose.png";
import trash from "./trash.png";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
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
  height: 32.53px;
  background-image: url(${fav});
  margin-top: 54px;
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
    text-decoration: none;
    color: #3f3a3a;
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
    background-image: url(${cart});
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

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 35px;
  margin-bottom: 50px;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductImg = styled.div`
  width: 239px;
  height: 326px;
  background-image: url(${(props) => props.url});
  background-size: cover;
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
  color: #3f3a3a;
`;

const ProductPrice = styled.p`
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: #3f3a3a;
`;

const Delete = styled.div`
  background-image: url(${trash});
  width: 49px;
  height: 50px;
  top: 40px;
  cursor: pointer;
`;

export default function FavProducts() {
  const [collection, setCollection] = useState([]);
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

  useEffect(() => {
    const favProduct = JSON.parse(localStorage.getItem("collection"));
    setCollection(favProduct);
  }, []);

  if (!collection) {
    return;
  }
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
        <Titletext>收藏商品</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <Splict></Splict>
      <ProductItemContainer>
        {collection.map((item) => (
          <ProductContainer>
            <ProductImg url={item.url} />
            <ProductDetail>
              <ProductTitle>{item.name}</ProductTitle>
              <ProductPrice>{item.price}</ProductPrice>
              <Delete />
            </ProductDetail>
          </ProductContainer>
        ))}
      </ProductItemContainer>
    </Wrapper>
  );
}
