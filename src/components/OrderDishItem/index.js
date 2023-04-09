import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { DataStore } from "aws-amplify";
import { BasketDish, Dish } from "../../models";


const OrderDishItem = ({orderDish}) =>{

    const [orderItem, setOrderItem] = useState([]);
    
    useEffect(()=>{
        console.log('basketDishes', orderDish);
        queryDish();
    },[orderDish]);

    const queryDish = async ()=>{
        const dishes = await DataStore.query(Dish, (d)=>d.id.eq(orderDish.orderDishDishId));
        setOrderItem(dishes[0]);
    };

    return(
        <View style={styles.row}>
                <View style={styles.quatityContainer}>
                    <Text>{orderDish.quantity}</Text>
                </View>
                <Text style={{fontWeight:'bold'}}>{orderItem.name}</Text>
                <Text style={{marginLeft:"auto"}}>Rs {orderItem.price}</Text>
            </View>
    );
}
export default OrderDishItem;

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
        margin:7,
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