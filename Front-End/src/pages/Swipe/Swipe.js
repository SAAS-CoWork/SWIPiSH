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
import likeMsg from './likeMsg.png';
import notLikeMsg from './notLikeMsg.png';
import soso from './soso.png';

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
    right: 22px;
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

const AdContainer = styled.div`
  width: 800px;
  height: 600px;
  position: fixed;
  left: 20%;
  top: 20%;
  background-image: url(${(props) => props.url});
  display: ${(props) => props.display};
`;

function Swipe() {
  const jwt = localStorage.getItem('loginToken');
  const [db, setDb] = useState();
  const [currentIndex, setCurrentIndex] = useState(9);
  const [swipeCount, setSwipeCount] = useState(0);
  const [collection, setCollection] = useState([]);
  const [hasSwipeEight, setHasSwipeEight] = useState(false);
  const [swipeRecord, setSwipeRecord] = useState([]);
  const [swipeStatus, setSwipeStatus] = useState('');
  const navigate = useNavigate();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
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

  const canGoBack = currentIndex < 10;

  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    setSwipeCount(swipeCount + 1);
    if (canSwipe && currentIndex < 10) {
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

  async function storeLike(data, like, superLike) {
    const dataInfo = {
      product_id: data.id,
      like: like,
      super_like: superLike,
    };
    try {
      const res = await fetch(
        'https://www.gotolive.online/api/1.0/recommendation',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataInfo),
        }
      );
      const data_1 = await res.json();
      return data_1;
    } catch (err) {
      return console.log(err);
    }
  }

  function handleSuperLike(data) {
    if (canSwipe) {
      storeLike(data, true, true);
      navigate(`../products/${db[currentIndex].id}`);
    }
  }

  function handleLike(data) {
    if (canSwipe) {
      swipe('right');
      addToCollection();
      storeLike(data, true, false);
      setSwipeRecord([...swipeRecord, 'like']);
    }
  }

  function handleDislike(data) {
    if (canSwipe) {
      swipe('left');
      storeLike(data, false, false);
      setSwipeRecord([...swipeRecord, 'dislike']);
    }
  }

  function fetchRecommendation() {
    return fetch('https://www.gotolive.online/api/1.0/recommendation', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('collection'));
    if (savedItems) {
      setCollection(savedItems);
    } else {
      setCollection([]);
    }

    if (jwt) {
      fetchRecommendation().then((data) => setDb(data.data));
    }
  }, []);

  useEffect(() => {
    if (collection !== null) {
      localStorage.setItem('collection', JSON.stringify(collection));
    }
  }, [collection]);

  useEffect(() => {
    if (swipeCount === 8) {
      const likes = swipeRecord.filter((item) => item === 'like');
      const dislikes = swipeRecord.filter((item) => item === 'dislike');
      likes.length > dislikes.length
        ? setSwipeStatus('like')
        : likes.length < dislikes.length
        ? setSwipeStatus('dislike')
        : setSwipeStatus('neutral');
      setHasSwipeEight(true);
    }
  }, [swipeCount, swipeRecord]);

  useEffect(() => {
    const handleClick = () => {
      if (hasSwipeEight) {
        navigate('/');
        window.removeEventListener('click', handleClick);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [hasSwipeEight]);

  if (!db) {
    return;
  }

  return (
    <Wrapper>
      <Collection>
        <Title>
          <TitleText>收藏商品</TitleText>
          <TitleIcon />
        </Title>
        <SplitLine />
        <AdContainer
          display={hasSwipeEight ? 'block' : 'none'}
          url={
            swipeStatus === 'like'
              ? likeMsg
              : swipeStatus === 'dislike'
              ? notLikeMsg
              : soso
          }
        />
        {!collection || collection.length === 0 ? null : (
          <Products>
            {collection.map((item, index) => (
              <ProductContainer key={index}>
                <ProductImg imgUrl={item.main_image} />
                <ProductInfoContainer>
                  <ProductInfo>
                    <InfoText>{item.title}</InfoText>
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
                  <SwipeTitle>{character.title}</SwipeTitle>
                  <SwipePrice>TWD.{character.price}</SwipePrice>
                </SwipeBottomContainer>
                <Card
                  style={{
                    backgroundImage: 'url(' + character.main_image + ')',
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
            <LikeBtn
              imgUrl={notLike}
              onClick={() => handleDislike(db[currentIndex])}
            ></LikeBtn>
            <LikeBtn
              imgUrl={like}
              onClick={() => {
                handleLike(db[currentIndex]);
              }}
            ></LikeBtn>
            <LikeBtn
              imgUrl={superLike}
              onClick={() => {
                handleSuperLike(db[currentIndex]);
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
