import { useEffect, useState } from 'react';

export type OAuthProvider = 'kakao' | 'naver' | 'google';

const KAKAO = {
  SDK_URL: 'https://developers.kakao.com/sdk/js/kakao.min.js',
  CLIENT_ID: '',
  REDIRECT_URI: '',
};
const NAVER = {
  SDK_URL: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js',
  CLIENT_ID: '',
  REDIRECT_URI: '',
};
const GOOGLE = {
  CLIENT_ID: '',
  REDIRECT_URI: '',
};

type UserData = any;

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      Auth: {
        login: (options: { success: (authObj: { access_token: string }) => void; fail: (err: any) => void }) => void;
      };
    };
    naver: any;
    gapi: {
      auth2: {
        getAuthInstance: () => {
          signIn: () => Promise<any>;
        };
      };
    };
  }
}

export default function useSocialLogin() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const loadKakaoSDK = () => {
    const script = document.createElement('script');
    script.src = KAKAO.SDK_URL;
    // script.onload = () => {
    //   window.Kakao.init(KAKAO.CLIENT_ID);
    // };
    // document.body.appendChild(script);
  };

  const loadNaverSDK = () => {
    const script = document.createElement('script');
    script.src = NAVER.SDK_URL;
    // script.onload = () => {
    //   const naverLogin = new window.naver.LoginWithNaverId({
    //     clientId: 'YOUR_NAVER_CLIENT_ID',
    //     callbackUrl: 'YOUR_CALLBACK_URL',
    //     isPopup: false,
    //     loginButton: { color: 'green', type: 3, height: '47' },
    //   });
    //   naverLogin.init();
    // };
    // document.body.appendChild(script);
  };

  const handleGoogleLogin = () => {
    return console.log('🚧 Google login!');
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(async (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      await sendTokenToBackend('google', token);
    });
  };

  const handleKakaoLogin = () => {
    return console.log('🚧 Kakao login!');
    window.Kakao.Auth.login({
      success: async (authObj) => {
        const token = authObj.access_token;
        await sendTokenToBackend('kakao', token);
      },
      fail: (err) => {
        console.error(err);
      },
    });
  };
  const handleNaverLogin = () => {
    return console.log('🚧 Naver login!');
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'YOUR_NAVER_CLIENT_ID',
      callbackUrl: 'YOUR_CALLBACK_URL',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: '47' },
    });
    naverLogin.init();
    naverLogin.getLoginStatus(async (status: boolean) => {
      if (status) {
        const token = naverLogin.user.accessToken;
        await sendTokenToBackend('naver', token);
      }
    });
  };

  const sendTokenToBackend = async (provider: string, token: string) => {
    try {
      const response = {
        ok: true,
        json: () => Promise.resolve({ user: {}, redirectUrl: '/' }),
      };

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);

        // TODO: 로그인 성공 시 리다이렉트
        window.location.href = data.redirectUrl;
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  };

  const login = (provider: OAuthProvider) => {
    switch (provider) {
      case 'kakao':
        handleKakaoLogin();
        break;
      case 'google':
        handleGoogleLogin();
        break;
      case 'naver':
        handleNaverLogin();
        break;
      default:
        console.error('Unknown provider');
    }
  };

  useEffect(() => {
    const loadSDK = () => {
      loadKakaoSDK();
      loadNaverSDK();
    };
    loadSDK();
  }, []);

  return {
    userData,
    login,
  };
}
