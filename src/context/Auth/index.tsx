import React from 'react';
import { Login, User } from '../../interfaces/Auth';
import { api, AuthService } from '../../services';
import { Storage } from '../../utils/storage';
import { AuthContextProps } from './props';

export const AuthContext = React.createContext({} as AuthContextProps);

const TOKEN_KEY = `@token`;
const USER_KEY = `@user`;

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [logged, setLogged] = React.useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>();
  const [currentToken, setCurrentToken] = React.useState<string | undefined>();

  const login = async (data: Login): Promise<void> => {
    setIsLoadingLogin(true);
    try {
      const response = await AuthService.doLogin(data);
      if (response.data && response.data.access_token) {
        setCurrentToken(response.data.access_token);
        Storage.setItem(TOKEN_KEY, response.data.access_token).catch();
      }
    } catch (e) {
      Storage.removeItem(TOKEN_KEY).catch();
      throw e;
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const logout = async (): Promise<void> => {
    Storage.removeItem(TOKEN_KEY).catch((e) => console.error(e));
    Storage.removeItem(USER_KEY).catch((e) => console.error(e));
    setCurrentToken(undefined);
  };

  React.useEffect(() => {
    Storage.getItem(TOKEN_KEY).then((token) => {
      setCurrentToken(token);
    });
  });

  // fetch user based on event set current token
  React.useEffect(() => {
    let cancelController: AbortController;

    if (currentToken !== undefined) {
      api.defaults.headers['Authorization'] = `Bearer ${currentToken}`;
      cancelController = new AbortController();

      AuthService.getProfile(cancelController)
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      setCurrentUser(undefined);
    }

    return () => {
      cancelController && cancelController.abort();
    };
  }, [currentToken]);

  // define wheather logged based on currentuser
  React.useEffect(() => {
    if (!currentUser) {
      Storage.removeItem(USER_KEY).catch((e) => console.error(e));
    } else {
      Storage.setItem(USER_KEY, currentUser).catch((e) => console.error(e));
    }
    setLogged(currentUser !== undefined);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoadingLogin,
        logged,
        currentUser,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
