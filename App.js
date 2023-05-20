import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
            style={{flex: 1}}>
            <Navigation loggedIn={loggedIn} />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
