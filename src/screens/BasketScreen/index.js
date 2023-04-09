
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";


import { useBasketContext } from "../../contexts/BasketContext";
import { useState } from "react";
import { useOrderContext } from "../../contexts/OrderContext";

import { useNavigation } from "@react-navigation/native";

const Basket = ()=>{

    const navigation = useNavigation();

    const {restaurant, totalPrice} = useBasketContext();
    const {basketDishes} = useBasketContext();
    const {createOrder} = useOrderContext();

    const onCreateOrder = async () =>{
        await createOrder();
        navigation.goBack();
    };

    
    return(
        <View style={styles.page}>
            <Text style={styles.name}>{restaurant?.name}</Text>

            <Text style={{fontWeight:'bold', marginTop:20, fontSize:19}}>Your Items</Text>
            
            <FlatList
            data={basketDishes}
            renderItem={({item})=><BasketDishItem basketDish={item} />}
            />
            <View style={styles.seperator} />
            
            <Pressable style={styles.button} onPress={onCreateOrder}>
                <Text style={styles.buttonText}>Create Order . Rs{totalPrice}</Text>
            </Pressable>
        </View>
    );
}
export default Basket;

const styles = StyleSheet.create({
    page:{
        flex:1,
        width:'100%',
        paddingVertical:10,
        padding:10,
    },
    name:{
        fontSize:30,
        fontWeight:'600',
        marginVertical:10
    },
    description:{
         color:'grey'
    },
    seperator:{
        height:1,
        backgroundColor:'lightgrey',
        marginVertical:10,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:20
    },
    quantity:{
        fontSize:25,
        marginHorizontal:20
    },
    button:{
        backgroundColor:'black',
        marginTop:'auto',
        padding:20,
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        fontWeight:'600',
        fontSize:18
    },
    quatityContainer:{
        backgroundColor:'lightgrey',
        paddingHorizontal:5,
        marginRight:10,
        marginVertical:5,
        borderRadius:3
    }
});