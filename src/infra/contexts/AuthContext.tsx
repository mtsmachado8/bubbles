import React, { useState, createContext, ReactNode } from 'react';
import {
  useGoogleLogin,
  useGoogleLogout,
  GoogleLoginResponse,
  UseGoogleLoginResponse,
  UseGoogleLogoutResponse
} from 'react-google-login'
import { toast } from 'react-toastify';

const AuthContext = createContext<{
  loggedUser: UserProfile,
  login: () => void,
  logout: () => void,
}>(null);

const { Provider, Consumer } = AuthContext;

type Props = {
  children: ReactNode
}

type UserProfile = {
  name: string,
  email: string,
  avatarUrl: string,
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loggedUser, _setUserProfile] = useState<UserProfile>(null);
  
  const onFailureGoogle = (error: any) => {
    console.log(error)

    toast.error('Ops... There was a connection error', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const onLogoutGoogle = () => {
    _setUserProfile(null)

    toast.dark('Bye! See you later', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const onSuccessGoogle = ({ profileObj }: GoogleLoginResponse) => {
    _setUserProfile({
      name: profileObj.name,
      email: profileObj.email,
      avatarUrl: profileObj.imageUrl,
    })

    toast.dark(`Welcome Mr(s) ${profileObj.familyName}`, {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const { signIn: login }: UseGoogleLoginResponse = useGoogleLogin({
    clientId: '17940802887-ohvi1iv0t9bi0npo26cetochgff4u16e.apps.googleusercontent.com',
    isSignedIn: true,
    onSuccess: onSuccessGoogle,
    onFailure: onFailureGoogle,
    cookiePolicy: 'single_host_origin'
  })

  const { signOut: logout }: UseGoogleLogoutResponse = useGoogleLogout({
    clientId: '17940802887-ohvi1iv0t9bi0npo26cetochgff4u16e.apps.googleusercontent.com',
    onLogoutSuccess: onLogoutGoogle,
  })

  return (
    <>
      <Provider
        value={{
          loggedUser,
          login,
          logout
        }}
        
      >
        {children}
      </Provider>
    </>
  );
};

export { AuthProvider as Provider, Consumer };

export default AuthContext;
