import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import styled from 'styled-components/macro';
import heart from "./heart.png";
import like from "./like.png";
import notLike from "./notLike.png";
import superLike from "./superLike.png";
import goback from "./goback.png";
import trash from "./trash.png";
// import product from "./product.png";

const db = [
  {
    name: "前開衩扭結洋裝",
    url: "https://api.appworks-school.tw/assets/201902191210/main.jpg",
    price: "799",
  },
  {
    name: "透肌澎澎防曬襯衫",
    url: "https://api.appworks-school.tw/assets/201807202140/main.jpg",
    price: "599",
  },
  {
    name: "小扇紋細織上衣",
    url: "https://api.appworks-school.tw/assets/201807202150/main.jpg",
    price: "599",
  },
  {
    name: "活力花紋長筒牛仔褲",
    url: "https://api.appworks-school.tw/assets/201807202157/main.jpg",
    price: "1299",
  },
  {
    name: "純色輕薄百搭襯衫",
    url: "https://api.appworks-school.tw/assets/201807242211/main.jpg",
    price: "799",
  },
];

const Wrapper = styled.div`
  width: 1476px;
  margin: 100px auto 50px;
  display: flex;
  gap: 99px;
  overflow: hidden;
  @media screen and (max-width: 1279px) {
    ${'' /* 手機還沒切 */}
  }
`;

// const productInfo = {
//   title: "前開衩扭結洋裝",
//   price: 799,
//   colors: ["FFFFF", "DDFFBB", "D3D3D3"],
//   img: product,
// };

// const collections = Array.from({ length: 6 }, () => ({ ...db }));
// const displayedProduct = { title: "前開衩扭結洋裝", price: 799 };

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
  align-items: flex-end;
`;

const SwipeBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -545px;
  left: 100px;
  z-index: 100;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 660px;
  height: 600px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SwipeImg = styled.div`
  width: 427px;
  height: 569px;
  background-size: fill;
  background-repeat: no-repeat;
  position: relative;
`;

const SwipeTitle = styled.h2`
  font-size: 24px;
  letter-spacing: 4px;
  font-weight: 700;
  color:#ffffff;
  text-shadow: black 0.05em 0.05em 0.3em;
`;

const Card = styled.div`
  height: 569px;
  width: 427px;
  position: absolute;
  background-size: fill;
`;

const SwipePrice = styled.h3`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 4px;
  color:#ffffff;
  text-shadow: black 0.05em 0.05em 0.3em;
`;

const LikeBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
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
  font-size: 16px;
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

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

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
            {/* <ProductImg imgUrl={product.img} />
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
              </ProductInfoContainer> */}
          </ProductContainer>
        </Products>
      </Collection>
      <SwipeZone>
        <ContentContainer>
          <SwipeImg>
            {db.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
                style={{
                  display: "flex",
                  justifycontent: "center",
                  position: "absolute",
                }}
              >
                <SwipeBottomContainer>
                  <SwipeTitle>{character.name}</SwipeTitle>
                  <SwipePrice>TWD.{character.price}</SwipePrice>
                </SwipeBottomContainer>
                <Card
                  style={{
                    backgroundImage: "url(" + character.url + ")",
                    boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.10)",
                    borderRadius: "20px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Card>
              </TinderCard>
            ))}
          </SwipeImg>
        </ContentContainer>
        <LikeBtnContainer>
          <div className="buttons" style={{ display: "flex" }}>
            <LikeBtn
              imgUrl={goback}
              style={{ backgroundColor: !canGoBack && "#c3c4d3", marginLeft:"25px", cursor:"pointer" }}
              onClick={() => goBack()}
            ></LikeBtn>
            <LikeBtn
              imgUrl={notLike}
              style={{ backgroundColor: !canSwipe && "#c3c4d3", marginLeft:"25px", cursor:"pointer" }}
              onClick={() => swipe("left")}
            ></LikeBtn>
            <LikeBtn
              imgUrl={like}
              style={{ backgroundColor: !canSwipe && "#c3c4d3", marginLeft:"25px" , cursor:"pointer" }}
              onClick={() => swipe("right")}
            ></LikeBtn>
            <LikeBtn
              imgUrl={superLike}
              style={{marginLeft:"25px", cursor:"pointer" }}
              // style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              // onClick={() => goBack()}
            ></LikeBtn>
          </div>
          {/* {lastDirection ? (
            <h2 key={lastDirection} className="infoText">
              {lastDirection}
            </h2>
          ) : (
            <h2 className="infoText"></h2>
          )} */}
        </LikeBtnContainer>
      </SwipeZone>
    </Wrapper>
  );
}

export default Swipe;
