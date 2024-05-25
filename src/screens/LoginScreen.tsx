import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import TextInput from '../components/MyTextInput';
import auth from '@react-native-firebase/auth';
import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '878121744849-qrffvvmdnms5vrthol94sntv00hml3b1.apps.googleusercontent.com',
    });
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();
    console.log(idToken);
    console.log(user);
    Alert.alert('Successfull sign in');
    navigation.navigate('home');
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const loginWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        Alert.alert('Logged In Succesfully');
        navigation.navigate('home');
      })
      .catch(err => {
        console.log(err);
        Alert.alert(err.nativeErrorMessage);
      });
  };
  return (
    <View>
      <Text style={styles.heading}>Login Screen</Text>
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
      <Button title="Login" onPress={loginWithEmailAndPassword} />
      <Button title="google" onPress={onGoogleButtonPress} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Medium',
  },
});
