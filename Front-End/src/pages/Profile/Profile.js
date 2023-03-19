import styled from 'styled-components';
import { Link } from 'react-router-dom';
import edit from './edit.png';
import profile from './profile.png';
import { useState, useEffect } from 'react';
// import { useContext } from 'react';
// import ReactLoading from 'react-loading';
// import { AuthContext } from '../../context/authContext';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  border: 2px solid #3f3a3a;
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
  margin-bottom: 48px;
  text-align: center;
  font-size: 24px;
  line-height: 38px;
  font-weight: 700;
  letter-spacing: 6.4px;
  color: #3f3f3a;
`;

const FavIcon = styled.div`
  width: 37.17px;
  height: 37.53px;
  background-image: url(${profile});
  margin-top: 91px;
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
`;

const Splict = styled.div`
  border-top: 1px solid #3f3a3a;
  width: 60%;
  margin-bottom: 74px;
  align-self: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 43px;
  margin-bottom: 100px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
    width: 576px;
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
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const PwWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PwTitle = styled.p`
  width: 120px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
`;

const PwInput = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
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
`;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const loginToken = localStorage.getItem('loginToken');

  useEffect(() => {
    fetch('http://54.64.47.158:3001/api/1.0/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.data))
      .catch((err) => console.log(err));
  }, [loginToken]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
      <Title>
        <Titletext>會員資料</Titletext>
        <FavIcon></FavIcon>
      </Title>
      <Splict></Splict>
      <ProfileWrapper>
        <AccountWrapper>
          <AccountTitle>帳號</AccountTitle>
          <Account>{userData.email}</Account>
        </AccountWrapper>
        <SubWrapper>
          <SubTitle>方案</SubTitle>
          <SubStatus>
            <BoldText>Platinum</BoldText>
            <span>(Expiration Date 2024-3-23)</span>
          </SubStatus>
        </SubWrapper>
        <NameWrapper>
          <NameTitle>姓名</NameTitle>
          <NameInput type='text'>{userData.name}</NameInput>
          <Edit onClick={handleEditClick}></Edit>
          {isEditing && (
            <EditBox>
              <textarea type='text' defaultValue='Sam Alison Amber' />
            </EditBox>
          )}
        </NameWrapper>
        <EmailWrapper>
          <EmailTitle>信箱</EmailTitle>
          <EmailInput>{userData.email}</EmailInput>
          <Edit onClick={handleEditClick}></Edit>
          {isEditing && (
            <EditBox>
              <textarea type='text' defaultValue='swipishmanager@saas.com' />
            </EditBox>
          )}
        </EmailWrapper>
        <PwWrapper>
          <PwTitle>密碼</PwTitle>
          <PwInput>{userData.password}</PwInput>
          <Edit onClick={handleEditClick}></Edit>
          {isEditing && (
            <EditBox>
              <textarea type='text' defaultValue='******' />
            </EditBox>
          )}
        </PwWrapper>
      </ProfileWrapper>
      <Submit onClick={handleSaveClick}>確認送出</Submit>
    </Wrapper>
  );
}

// function Profile() {
//   const { user, isLogin, login, logout, loading } = useContext(AuthContext);

//   const renderContent = () => {
//     if (loading) return <Loading type="spinningBubbles" color="#313538" />;
//     if (isLogin) return (
//       <>
//         <Photo src={user.picture} />
//         <Content>{user.name}</Content>
//         <Content>{user.email}</Content>
//         <LogoutButton
//           onClick={logout}
//         >
//           登出
//         </LogoutButton>
//       </>
//     );
//     return (
//       <LogoutButton onClick={login}>登入</LogoutButton>
//     );
//   }
//   return (
//   );
// }
