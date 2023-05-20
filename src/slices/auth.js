import AsyncStorage from '@react-native-async-storage/async-storage';

export const loggedIn = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error setting token:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};
