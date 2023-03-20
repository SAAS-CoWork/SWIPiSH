import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import styled from 'styled-components/macro';
import heart from './heart.png';
import like from './like.png';
import notLike from './notLike.png';
import superLike from './superLike.png';
import goback from './goback.png';
import trash from './trash.png';
// import product from "./product.png";

// fetch('https://www.gotolive.online/api/1.0/user/profile', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${loginToken}`,
//     'Content-Type': 'application/json',
//   },
// })

const db = [
  {
    name: '前開衩扭結洋裝',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F1DI001_09_M_01_m.jpg',
    price: '799',
    id: '201902191248',
  },
  {
    name: 'S曲線翹臀心機修修褲',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F2CO017_09_M_01_m.jpg',
    price: '790',
    id: '201902191335',
  },
  {
    name: '傑利鼠手提袋',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F2WB015_47_M_01_m.jpg',
    price: '790',
    id: '201902191449',
  },
  {
    name: '三眼怪防潑水短褲',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F1DI011_09_M_01_m.jpg',
    price: '790',
    id: '201902191255',
  },
  {
    name: '傑利鼠撞色襯衫',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F1WB013_27_M_01_m.jpg',
    price: '799',
    id: '201902191298',
  },
  {
    name: '前開衩扭結洋裝',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F1DI001_09_M_01_m.jpg',
    price: '799',
    id: '201902191248',
  },
  {
    name: 'S曲線翹臀心機修修褲',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F2CO017_09_M_01_m.jpg',
    price: '790',
    id: '201902191335',
  },
  {
    name: '傑利鼠手提袋',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F2WB015_47_M_01_m.jpg',
    price: '790',
    id: '201902191449',
  },
  {
    name: '三眼怪防潑水短褲',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F1DI011_09_M_01_m.jpg',
    price: '790',
    id: '201902191255',
  },
  {
    name: '傑利鼠撞色襯衫',
    url: 'https://hbt001.ccis.chiefappc.com/cac/CmiProd/F1WB013_27_M_01_m.jpg',
    price: '799',
    id: '201902191298',
  },
];

const Wrapper = styled.div`
  width: 100%;
  margin: 45px auto 50px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  @media screen and (max-width: 1279px) {
    overflow: hidden;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    gap: 50px;
  }
`;

const Collection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const SwipeZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 340px;
    gap: 0px;
  }
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
  @media screen and (max-width: 1279px) {
    left: 57px;
    bottom: -483px;
  }
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
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
  @media screen and (max-width: 1279px) {
    width: 100%;
    height: 549px;
  }
`;

const SwipeTitle = styled.h2`
  font-size: 24px;
  letter-spacing: 4px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: black 0.05em 0.05em 0.3em;
`;

const Card = styled.div`
  height: 569px;
  width: 427px;
  position: absolute;
  background-size: fill;
  @media screen and (max-width: 1279px) {
    width: 300px;
    height: 500px;
    right:22px;
  }
`;

const SwipePrice = styled.h3`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #ffffff;
  text-shadow: black 0.05em 0.05em 0.3em;
`;

const LikeBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
  @media screen and (max-width: 1279px) {
    gap: 10px;
  }
`;

const LikeBtn = styled.button`
  width: 70px;
  height: 70px;
  background-image: url(${(props) => props.imgUrl});
  border: 0;
  background-color: white;
  background-size: cover;
  cursor: pointer;
  padding: 0px;
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
  width: 80%;
  margin-bottom: 50px;
  @media screen and (max-width: 1279px) {
  }
`;

const Products = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  @media screen and (max-width: 1279px) {
  }
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
  background-size: cover;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  cursor: pointer;
`;

function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [collection, setCollection] = useState([]);
  const navigate = useNavigate();
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

  function addToCollection() {
    const ids = collection.map((item) => item.id);
    if (ids.indexOf(db[currentIndex].id) === -1) {
      const newCollection = [...collection, db[currentIndex]];
      setCollection(newCollection);
    }
    return;
  }

  function handleSuperLike() {
    navigate(`../products/${db[currentIndex].id}`);
  }

  function handleLike() {
    swipe('right');
    addToCollection();
  }

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('collection'));
    if (savedItems) {
      setCollection(savedItems);
    } else {
      setCollection([]);
    }
  }, []);

  useEffect(() => {
    if (collection !== null) {
      localStorage.setItem('collection', JSON.stringify(collection));
    }
  }, [collection]);

  return (
    <Wrapper>
      <Collection>
        <Title>
          <TitleText>收藏商品</TitleText>
          <TitleIcon />
        </Title>
        <SplitLine />
        {!collection || collection.length === 0 ? null : (
          <Products>
            {collection.map((item, index) => (
              <ProductContainer key={index}>
                <ProductImg imgUrl={item.url} />
                <ProductInfoContainer>
                  <ProductInfo>
                    <InfoText>{item.name}</InfoText>
                    <InfoText>TWD. {item.price}</InfoText>
                  </ProductInfo>
                  <RemoveIcon
                    onClick={() => {
                      const newCollection = [...collection];
                      newCollection.splice(index, 1);
                      setCollection(newCollection);
                    }}
                  />
                </ProductInfoContainer>
              </ProductContainer>
            ))}
          </Products>
        )}
      </Collection>
      <SwipeZone>
        <ContentContainer>
          <SwipeImg>
            {db.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className='swipe'
                key={index}
                onSwipe={(dir) => {
                  swiped(dir, character.name, index);
                  if (dir === 'right') {
                    addToCollection();
                  }
                }}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
                style={{
                  display: 'flex',
                  justifycontent: 'center',
                  position: 'absolute',
                }}
              >
                <SwipeBottomContainer>
                  <SwipeTitle>{character.name}</SwipeTitle>
                  <SwipePrice>TWD.{character.price}</SwipePrice>
                </SwipeBottomContainer>
                <Card
                  style={{
                    backgroundImage: 'url(' + character.url + ')',
                    boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.10)',
                    borderRadius: '20px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></Card>
              </TinderCard>
            ))}
          </SwipeImg>
        </ContentContainer>
        <LikeBtnContainer>
          <Buttons>
            <LikeBtn imgUrl={goback} onClick={() => goBack()}></LikeBtn>
            <LikeBtn imgUrl={notLike} onClick={() => swipe('left')}></LikeBtn>
            <LikeBtn
              imgUrl={like}
              onClick={() => {
                handleLike();
              }}
            ></LikeBtn>
            <LikeBtn
              imgUrl={superLike}
              onClick={() => {
                handleSuperLike();
              }}
            ></LikeBtn>
          </Buttons>
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
