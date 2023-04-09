import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import restaurants from '../../data/restaurants.json'
import {AntDesign} from '@expo/vector-icons'

import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable } from 'react-native';

//Amplify
import { Dish } from '../../models';
import { DataStore } from 'aws-amplify';

import { useBasketContext } from '../../contexts/BasketContext';


const DishDetailScreen = ()=>{
    const navigation = useNavigation();
    const [cart, setCart] = useState(0);
    const [ dish, setDish] = useState({});
    const route = useRoute();
    const id = route.params.id;
    
    const { addDishToBasket } = useBasketContext();

    useEffect(()=>{
        DataStore.query(Dish, id).then(setDish);
    }, []);

    const onAddBasket = async () =>{
        await addDishToBasket(dish, cart);
        navigation.goBack();
    }

    const getTotal = ()=>{
        return (cart * dish.price).toFixed(2);
    }
    if(!dish){
        return(
            <ActivityIndicator size={30} />
        );
    }
    return(
        <View style={styles.page}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <View style={styles.seperator} />
            <View style={styles.row}>
                <AntDesign name="minuscircleo" size={60} color={"black"} onPress={()=>setCart(cart-1)} disabled={cart==0}/>
                <Text style={styles.quantity}>{cart}</Text>
                <AntDesign name="pluscircleo" size={60} color={"black"} onPress={()=>setCart(cart+1)}/>
            </View>
            <Pressable onPress={onAddBasket}  style={styles.button}>
                <Text style={styles.buttonText}>Add {cart} to basket (Rs{getTotal()})</Text>
            </Pressable>
        </View>
    );
}
export default DishDetailScreen;

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
        justifyContent:'center',
        marginTop:50
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
    }
});