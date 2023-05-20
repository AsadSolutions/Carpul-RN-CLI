import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import BookedCar from '../components/BookedCar';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OfferRideScreen from '../components/OfferRideScreen';
import TabNavigator from './TabNavigator';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

export default function Navigation() {
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
  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token');
  //     setLoggedIn(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Stack.Navigator>
      {loggedIn ? (
        <>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BookedCar"
            component={BookedCar}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OfferRideScreen"
            component={OfferRideScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
