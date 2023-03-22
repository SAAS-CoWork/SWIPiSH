import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import edit from './edit.png';
import profile from './profile.png';
import biggerprofile from './biggerprofile.png';
import profilechoose from './profilechoose.png';
import fav from './fav.png';
import cart from './cart.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import ReactLoading from 'react-loading';
// import { AuthContext } from '../../context/authContext';

const Wrapper = styled.div`
  height: 100%;
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
  width: 35px;
  height: 35px;
  background-image: url(${profile});
  background-image: no-repeat;
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
    display: none;
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
  background: #3f3a3a;
  border: #3f3a3a solid 2px;
  color: #ffffff;
  font-size: 24px;
  letter-spacing: 6.4px;
  cursor: pointer;
  a {
    color: #ffffff;
    &:hover,
    &:link,
    &:active {
      text-decoration: none;
    }
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
    background-image: url(${profilechoose});
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

const Splict = styled.div`
  border-top: 1px solid #3f3a3a;
  width: 80%;
  margin-bottom: 74px;
  align-self: center;
  @media screen and (max-width: 1279px) {
    margin-bottom: 40px;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;
  margin-bottom: 50px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1279px) {
    width: 80%;
    gap: 30px;
  }
`;

const ProfileImgWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  input {
    color: transparent;
    margin-left: 174px;
    margin-top: 10px;
  }

  @media screen and (max-width: 1279px) {
    justify-content: center;
    flex-direction: column;
    align-self: center;
    gap: 10px;
    input {
      color: transparent;
      margin-left: 172px;
      margin-top: 10px;
    }
  }
`;

const ProfileImg = styled.div`
  width: 150px;
  height: 150px;
  /* background-image: url(${(props) =>
    props.selectedFileUrl ?? biggerprofile}); */
  background-image: url(${biggerprofile});
  background-size: cover;
  background-position: center;
  border-radius: 100px;
  @media screen and (max-width: 1279px) {
    width: 100px;
    height: 100px;
  }
`;

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const AccountTitle = styled.p`
  width: 120px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const Account = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Cancel = styled.button`
  margin-left: 10px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    margin-left: 0px;
    width: 74px;
  }
`;

const SubTitle = styled.p`
  width: 120px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const SubStatus = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const BoldText = styled.span`
  font-weight: bold;
  padding-right: 5px;
`;

const Edit = styled.div`
  width: 21px;
  height: 21px;
  background-image: url(${edit});
  margin-left: 30px;
  cursor: pointer;
  outline: none;
  @media screen and (max-width: 1279px) {
    margin-left: 0px;
  }
`;

const EditBox = styled.div`
  width: 30%;
  height: 32px;
  background-color: #ffffff;
  z-index: 1;
  border: 1px solid #979797;
  border-radius: 8px;
  color: #3f3f3a;
  position: absolute;
  margin-left: 118px;
  textarea {
    width: 100%;
    outline: none;
    appearance: none;
    border: none;
    font-weight: 700;
    font-family: 'Noto Sans TC';
    font-size: 16px;
    color: #3f3a3a;
    background: transparent;
    resize: none;
    white-space: nowrap;
  }
  @media screen and (max-width: 1279px) {
    margin-left: 0px;
    margin-top: 25px;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const NameTitle = styled.p`
  width: 120px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const NameInput = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const EmailTitle = styled.p`
  width: 120px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const EmailInput = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const SubmitContainer = styled.div`
  width: 60%;
  display: flex;
  margin: 0 auto;
  gap: 50px;
  justify-content: center;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Submit = styled.button`
  width: 240px;
  height: 64px;
  background: #3f3f3a;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: #ffffff;
  border: none;
  align-self: center;
  margin-bottom: 110px;
  cursor: pointer;
  @media screen and (max-width: 1279px) {
    margin-bottom: 10px;
    height: 44px;
    font-size: 16px;
  }
`;

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(
    localStorage.getItem('profileImg') || null
  );
  const loginToken = localStorage.getItem('loginToken');

  const saveImageToLocalStorage = (url) => {
    localStorage.setItem('profileImg', url);
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setSelectedFileUrl(url);
    saveImageToLocalStorage(url);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);
  //   // add additional form data, such as user ID or file name
  //   // send the form data to the server using an HTTP request, such as fetch()
  //   console.log(formData);
  // };

  const handleCancelClick = (e) => {
    const body = {
      data: {
        cancel: true,
      },
    };
    fetch('https://www.gotolive.online/api/1.0/order/subscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('恭喜你做了人生中最錯誤的選擇');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    saveImageToLocalStorage(selectedFileUrl);
  }, [selectedFileUrl]);

  function getUserData() {
    fetch('https://www.gotolive.online/api/1.0/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          navigate('/login');
        }
      })
      .then((data) => {
        if (data) {
          setUserData(data.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function logOut() {
    localStorage.removeItem('loginToken');
    window.location.href = '/';
  }

  useEffect(() => {
    if (loginToken) {
      getUserData();
    } else {
      navigate('/login');
    }
  }, []);

  if (!userData) {
    return;
  }
  return (
    <Wrapper>
      <MemberNav>
        <MemberButton2>
          <Link to='/Profile'>會員資料</Link>
        </MemberButton2>
        <MemberButton3>
          <Link to='/FavProducts'>收藏商品</Link>
        </MemberButton3>
        <MemberButton1>
          <Link to='/OrderStatus'>訂單狀態</Link>
        </MemberButton1>
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
        <Titletext>會員資料</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <Splict></Splict>
      <ProfileWrapper>
        <ProfileImgWrapper>
          <ProfileImg selectedFileUrl={selectedFileUrl}></ProfileImg>
          {/* <input
            type='file'
            accept='image/*'
            onChange={handleFileSelect}
            name='上傳'
            id='uploadImage'
            cursor='pointer'
          /> */}
          {/* <button type="submit" onSubmit={handleSubmit}>確認送出</button> */}
        </ProfileImgWrapper>
        <AccountWrapper>
          <AccountTitle>帳號</AccountTitle>
          <Account>{userData.email}</Account>
        </AccountWrapper>
        <SubWrapper>
          <SubTitle>方案</SubTitle>
          <SubStatus>
            <BoldText>
              {userData.plan === '' ? '非升級會員' : userData.plan}
            </BoldText>
            {userData.expire === true ? null : <span>{userData.expire}</span>}
          </SubStatus>
          <Cancel onClick={handleCancelClick}>取消訂閱</Cancel>
        </SubWrapper>
        <NameWrapper>
          <NameTitle>姓名</NameTitle>
          <NameInput type='text'>{userData.name}</NameInput>
          <Edit onClick={handleEditClick}></Edit>
          {isEditing && (
            <EditBox>
              <textarea type='text' defaultValue={userData.name} />
            </EditBox>
          )}
        </NameWrapper>
        <EmailWrapper>
          <EmailTitle>信箱</EmailTitle>
          <EmailInput>{userData.email}</EmailInput>
          <Edit onClick={handleEditClick}></Edit>
          {isEditing && (
            <EditBox>
              <textarea type='text' defaultValue={userData.email} />
            </EditBox>
          )}
        </EmailWrapper>
      </ProfileWrapper>
      <SubmitContainer>
        <Submit onClick={handleSaveClick}>確認送出</Submit>
        <Submit onClick={logOut}>登出</Submit>
      </SubmitContainer>
    </Wrapper>
  );
}
