import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import TextInput from '../components/MyTextInput';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const signUpTextFn = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User Created with id: ', email);
        navigation.navigate('login');
      })

      .catch(err => {
        console.log(err.nativeErrorMessage);
      });
  };
  return (
    <View>
      <Text style={styles.heading}>SignUpScreen</Text>
      <TextInput
        placeholder="enter email or username"
        value={email}
        onChangeText={(text: any) => setEmail(text)}
      />
      <TextInput
        placeholder="enter password"
        secureTextEntry
        value={password}
        onChangeText={(text: any) => setpassword(text)}
      />
      <Button title="SignUp" onPress={signUpTextFn} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Medium',
  },
});
