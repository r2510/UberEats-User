import {useEffect, useState} from 'react';
import { View, Text, Image, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';

const OrderListItem = ({order}) => {
  const navigation = useNavigation();
  const [restrnt, setRestaurant] = useState({});

  useEffect(async ()=>{
    // DataStore.query(Restaurant, r => r.id.eq(order.)).then(setRestaurant);
    // const rr = await order.Restaurant.toArray();
   const rr = await  DataStore.query(Restaurant, order.orderRestaurantId);
    setRestaurant(rr);
  }, [order])

  return (
    <Pressable onPress={()=>navigation.navigate('Order',{id:order.id})} style={{flexDirection:'row', margin: 10, alignItems:'center'}}>
      <Image source={{uri:restrnt.image}} style={{width:100, height:100, marginRight:5}}/>
    <View>
        <Text style={{fontWeight:'bold', fontSize:16}}>{restrnt.name}</Text>
        <Text style={{marginVertical:5}}>3 item Rs649</Text>
        <Text>2 days ago &#8226; {order.status}</Text>
    </View>
    </Pressable>
  )
}

export default OrderListItem