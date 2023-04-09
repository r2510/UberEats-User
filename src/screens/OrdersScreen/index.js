import React, {useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import orders from '../../data/orders.json';

import { useOrderContext } from "../../contexts/OrderContext";

const OrderScreen = () =>{

    const {orders} = useOrderContext();
    useEffect(()=>{
        console.log('orders',orders);
    },[])
    return(
        <View style={{flex:1, width:'100%'}}>
            <FlatList 
            data={orders}
            renderItem={({item}) => <OrderListItem order={item} />}
            />
        </View>
    );
}
export default OrderScreen;