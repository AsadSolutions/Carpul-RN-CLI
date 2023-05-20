import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {register} from '../api.js';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      console.error('All fields are required');
      return;
    }
    if (email.split('@')[1] !== 'herts.ac.uk') {
      console.error('Invalid email domain');
      return;
    }
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const token = await register(email, password);
      navigation.navigate('LoginScreen', {token});
    } catch (error) {
      console.error(error);
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
      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        leftIcon={<Icon name="lock" />}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
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

export default RegisterScreen;
