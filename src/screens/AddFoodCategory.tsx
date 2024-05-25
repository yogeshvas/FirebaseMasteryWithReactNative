import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const AddFoodCategory = ({navigation}: any) => {
  const [catName, setCatName] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('');

  const addCategory = () => {
    firestore()
      .collection('categories')
      .add({
        title: catName,
        imageUrl: catImageUrl,
      })
      .then(res => {
        navigation.navigate('home');
      })
      .catch(err => {
        Alert.alert('Error Happened');
      });
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>AddFoodCategory</Text>
      <TextInput
        value={catName}
        onChangeText={t => setCatName(t)}
        placeholder="Category Name"
      />
      <TextInput
        placeholder="Category Url"
        value={catImageUrl}
        onChangeText={t => setCatImageUrl(t)}
      />
      <Button title="Add Category" onPress={addCategory} />
    </View>
  );
};

export default AddFoodCategory;

const styles = StyleSheet.create({});
