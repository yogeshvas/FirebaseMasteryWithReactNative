import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({title, onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0036',
    borderRadius: 30,
  },
  titleText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});
