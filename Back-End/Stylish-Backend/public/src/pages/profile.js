function Profile({ profile, onClickLogout }) {
  return (
    <div className="profile">
      <div className="profile__title">會員基本資訊</div>
      <div className="profile__content">
        <img src={profile.picture} />
        <div className="profile__info">{profile.name}</div>
        <div className="profile__info">{profile.email}</div>
        <button className="profile__button" onClick={onClickLogout}>
          登出
        </button>
      </div>
    </div>
  );
}

async function getFbToken() {
  const statusResponse = await fb.getLoginStatus();
  if (statusResponse.status === 'connected') {
    return statusResponse.authResponse.accessToken;
  }
  const loginResponse = await fb.login();
  if (loginResponse.status === 'connected') {
    return loginResponse.authResponse.accessToken;
  }
  throw new Error('Facebook 登入失敗');
}

function AuthForm({ onSubmitSuccess }) {
  const [isSignup, setIsSignup] = React.useState(true);
  const signup = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const result = await api.signup({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
      if (result.error) {
        throw new Error(result.error);
      }
      onSubmitSuccess(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const signin = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const result = await api.signin({
        email: formData.get('email'),
        password: formData.get('password'),
        provider: 'native',
      });
      if (result.error) {
        throw new Error(result.error);
      }
      onSubmitSuccess(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const fbLogin = async () => {
    try {
      const accessToken = await getFbToken();
      const result = await api.signin({
        provider: 'facebook',
        access_token: accessToken,
      });
      if (result.error) {
        throw new Error(result.error);
      }
      onSubmitSuccess(result.data);
    } catch (error) {
      window.alert(error.message);
    }
  };
  return (
    <div className="profile">
      <form className="profile__form" onSubmit={isSignup ? signup : signin}>
        {isSignup ? (
          <React.Fragment>
            <div className="profile__label">Name:</div>
            <input type="text" name="name" className="profile__input" required />
          </React.Fragment>
        ) : null}
        <div className="profile__label">Email:</div>
        <input type="email" name="email" className="profile__input" required />
        <div className="profile__label">Password:</div>
        <input type="password" name="password" className="profile__input" required />
        <div className="profile__hint" onClick={() => setIsSignup((prev) => !prev)}>
          {isSignup ? '已有帳號？ 前往登入 ->' : '尚未有帳號？ 立即註冊 ->'}
        </div>
        <button type="submit" className="profile__button">
          {isSignup ? '註冊' : '登入'}
        </button>
        <button
          type="button"
          className="profile__button"
          style={{ backgroundColor: '#4267B2' }}
          onClick={fbLogin}
        >
          使用 Facebook
        </button>
      </form>
    </div>
  );
}

function App() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const [profile, setProfile] = React.useState();

  React.useEffect(() => {
    const jwtToken = window.localStorage.getItem('jwtToken');
    if (jwtToken) {
      api.getProfile(jwtToken).then((json) => setProfile(json.data));
    }
  }, []);

  React.useEffect(() => {
    fb.loadScript().then(fb.init);
  }, []);

  const handleSubmitSuccess = (data) => {
    window.localStorage.setItem('jwtToken', data.access_token);
    setProfile(data.user);
  };

  const logout = async () => {
    try {
      const response = await fb.getLoginStatus();
      if (response.status === 'connected') {
        await fb.logout();
      }
    } catch (error) {
      console.warn(error);
    }
    window.localStorage.removeItem('jwtToken');
    setProfile();
  };

  return (
    <React.Fragment>
      <Header cartItems={cart} />
      {profile ? (
        <Profile profile={profile} onClickLogout={logout} />
      ) : (
        <AuthForm onSubmitSuccess={handleSubmitSuccess} />
      )}
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
