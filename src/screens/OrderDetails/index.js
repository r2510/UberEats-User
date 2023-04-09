import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';

import restaurants from '../../data/restaurants.json';
import BasketDishItem from '../../components/BasketDishItem';
import OrderDishItem from '../../components/OrderDishItem';
import { useOrderContext } from '../../contexts/OrderContext';
import { useRoute } from '@react-navigation/native';


const OrderDetailsHeader = ({restaurant}) => {
    console.log('in this restaurant', restaurant);
    return (
        <View>
            <View style={styles.page}>
                <Image
                    source={{ uri: restaurant.image }}
                    style={styles.image}
                />

                <View style={styles.container}>
                    <Text style={styles.title}>{restaurant.name}</Text>
                    <Text style={styles.subtitle}>{restaurant.status} &#8226; 2 days ago</Text>

                    <Text style={styles.menuTitle}>Your Order</Text>
                </View>
            </View>
        </View>
    )
}

const OrderDetails = () => {

    const [order, setOrder] = useState();
    const [restaurant, setRestaurant] = useState();
    const [dishes, setDisshes] = useState([]);
    const {getOrder} = useOrderContext();
    const route = useRoute();
    const id = route.params?.id;

    useEffect(()=>{
        getOrder(id).then(or => {
            setOrder(or.curOrder);
            setRestaurant(or.curRes);
            setDisshes(or.dishes);
        console.log('orderrrrrrrrrr  curOrder', or.curOrder);
        console.log('orderrrrrrrrrr  curRes', or.curRes);
        console.log('orderrrrrrrrrr dishes', or.dishes);
        });
    },[])

    if(!order || !restaurant || !dishes){
        return <ActivityIndicator size={'large'} color="gray" />
    }

    return(
        <FlatList
        ListHeaderComponent={()=><OrderDetailsHeader restaurant={restaurant} />}
        data={dishes}
        renderItem={({item}) => <OrderDishItem orderDish={item} />}
        />
    );
}
export default OrderDetails