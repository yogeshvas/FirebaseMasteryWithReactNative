import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const MyTextInput = ({...props}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputContainer} {...props} />
      <View style={styles.border} />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputContainer: {},
  border: {
    width: '100%',
    backgroundColor: 'gray',
    height: 1,
    alignSelf: 'center',
  },
});
