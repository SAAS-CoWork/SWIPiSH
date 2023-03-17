const FB_SCRIPT_ID = 'facebook-jssdk';
const FB_SCRIPT_SRC = 'https://connect.facebook.net/zh_TW/sdk.js';

function insertFBScript() {
  if (document.getElementById(FB_SCRIPT_ID)) return;
  const fbScriptTag = document.createElement('script');
  fbScriptTag.setAttribute('id', FB_SCRIPT_ID);
  fbScriptTag.setAttribute('src', FB_SCRIPT_SRC);
  document.head.appendChild(fbScriptTag);
}

const fb = {
  init() {
    return new Promise((resolve) => {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: process.env.REACT_APP_FACEBOOK_ID,
          cookie: true,
          xfbml: true,
          version: 'v10.0',
        });
        resolve();
      };
      insertFBScript();
    });
  },
  getLoginStatus() {
    return new Promise((resolve) => {
      window.FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  },
  login() {
    return new Promise((resolve) => {
      window.FB.login(
        (response) => {
          resolve(response);
        },
        { scope: 'public_profile,email' }
      );
    });
  },
  logout() {
    return new Promise((resolve) => {
      window.FB.logout(() => {
        resolve();
      });
    });
  },
};

export default fb;
