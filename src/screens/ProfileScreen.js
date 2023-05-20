import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signOut} from '../slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      signOut(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
          <Octicons style={styles.signOutIcon} name="sign-out" color="red" />
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  signOutIcon: {
    marginRight: 10,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
