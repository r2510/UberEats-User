import React, {useState, useEffect} from'react'
;import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import RestaurantItem from '../../../src/components/Restaurant';
// import restaurants from '../../../src/data/restaurants.json'

//Amplify
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant } from '../../models';

const HomeScreen = () => {
  const [restaurants, setRestaurant] = useState([]);

  // const fetchRestaurant = async () =>{
  //   const result = await DataStore.query(Restaurant);
  //   setRestaurant(result);
  // };
//useEffect is a react component
//has 2 parameter..1. fetch data 2. empty array
//if u dont provide empty array it will render everytime
  useEffect(()=>{
    // fetchRestaurant();
    //instead of this
    // const result = await DataStore.query(Restaurant);
    // setRestaurant(result);
    //check this
    // DataStore.query(Restaurant).then((result)=>setRestaurant(result));
    DataStore.query(Restaurant).then(setRestaurant);
    // deleteAll();
    // subscriptionCall();
  },[]);
  //delete all items
  const deleteAll = async ()=>{
    await DataStore.clear();
  }
  //obsrve changes are recorded here
//   const subscriptionCall = ()=>{
//   const subscription = DataStore.observe(Restaurant).subscribe(msg => {
//     console.log(msg.model, msg.opType, msg.element);
//   });
//   console.log(subscription);
// }
 
  return (
    //Restaurent Item
    <View style={styles.page}>
      <FlatList
      data={restaurants}
      renderItem={({item})=><RestaurantItem restaurant={item} />} //destructing {item} from Flatlist
      showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  page:{
    padding:10
  }
});
