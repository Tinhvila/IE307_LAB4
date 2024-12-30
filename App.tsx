import './global.css';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from './context/context';
import AuthenticationStack from './navigations/AuthenticationStack';
import ShoppingStack from './navigations/ShoppingStack';
import Plash from './screens/Plash';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastProvider } from './components/toastContext';

export default function App() {
  const [token, setToken] = React.useState('');
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <NavigationContainer>
        <Plash />
      </NavigationContainer>
    );
  }

  return (
    <ToastProvider>
      <Provider store={store}>
        <AuthenticationContext.Provider
          value={{
            token,

            setToken,
          }}
        >
          <NavigationContainer>
            {/* <ShoppingStack /> */}
            {token ? <ShoppingStack /> : <AuthenticationStack />}
          </NavigationContainer>
        </AuthenticationContext.Provider>
      </Provider>
    </ToastProvider>
  );
}
