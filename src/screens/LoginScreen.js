import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {login} from '../api.js';
import {useNavigation} from '@react-navigation/native';
import {loggedIn} from '../slices/auth.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      loggedIn(token);

      navigation.navigate('HomeScreen', {token});
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Icon name="email" />}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        leftIcon={<Icon name="lock" />}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        type="clear"
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default LoginScreen;
