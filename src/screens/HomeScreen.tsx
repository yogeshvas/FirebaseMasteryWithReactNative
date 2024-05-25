import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import MyView from '../components/MyView';
import MyText from '../components/MyText';
import Search from '../components/Search';
import Button from '../components/Button';
import {FlatList} from 'react-native-gesture-handler';
import Category from '../components/Category';
import FoodCard from '../components/FoodCard';

const HomeScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [categories, setCategories] = useState([]); // Initial empty array of users
  const [foods, setFoods] = useState([]); // Initial empty array of users
  const getData = async () => {
    const foodCollection = await firestore().collection('food').get();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categories = [];

        querySnapshot.forEach(documentSnapshot => {
          categories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCategories(categories);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('food')
      .onSnapshot(res => {
        const foods = [];
        res.forEach(documentSnapshot => {
          foods.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setFoods(foods);
      });
    return () => subscriber();
  }, []);
  console.log(categories);
  const UpdateDocument = () => {
    firestore()
      .collection('')
      .doc('')
      .update({
        'info.address.zipcode': 94040,
      })
      .then(() => {
        console.log('User updated!');
      });
  };
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <MyView style={styles.con}>
      <MyText
        style={{marginTop: 57, marginBottom: 7, marginLeft: 21, fontSize: 19}}>
        Choose the
      </MyText>
      <MyText boldy style={styles.text}>
        Food You Love
      </MyText>
      <Search />
      <MyText style={styles.text}>Catogries</MyText>

      <Button
        title="Add Category Or Foods"
        onPress={() => navigation.navigate('AddFoodCategory')}
      />

      <Button title="test delete" />

      <View style={{height: 150}}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({item}) => (
            <Category
              title={item.title}
              itemKey={item.key}
              image={{uri: item.imageUrl}}
            />
          )}
        />
      </View>
      <MyText style={styles.text}>Main Dishes</MyText>

      <FlatList
        horizontal
        data={foods}
        renderItem={({item}) => (
          <FoodCard
            image={item.image_url}
            title={item.title}
            price={item.price}
            itemKey={item.key}
          />
        )}
      />
    </MyView>
  );
};

const styles = StyleSheet.create({
  con: {
    backgroundColor: '#f7f6ff',
  },
  text: {
    marginLeft: 21,
    fontSize: 19,
    marginBottom: 13,
  },
});
export default HomeScreen;
