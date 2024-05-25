import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SignUpScreen from './src/screens/SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation/MyStack';
import messaging from '@react-native-firebase/messaging';
export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  });
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
