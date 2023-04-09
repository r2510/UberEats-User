import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurants from '../../data/restaurants.json';
import Header from './Header.js'
import DishListItem from "../../components/DishListItems";
import styles from "./styles";

import { useRoute, useNavigation } from "@react-navigation/native";

//Amplify
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import { Dish } from "../../models";


import { useBasketContext } from "../../contexts/BasketContext";

const RestaurantDetailPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params.id;//fetch from route\
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDesishes] = useState([]);

    const { setRestaurant: setBasketRestaurant } = useBasketContext();
    const { basket, basketDishes } = useBasketContext();

    useEffect(() => {
        if (!id) {
            return;
        }
        setBasketRestaurant(null);
        DataStore.query(Restaurant, id).then(setRestaurant);

        DataStore.query(Dish, (dish) => dish.restaurantID.eq(id)).then(setDesishes);

    }, [id]);

    //from context
    useEffect(() => {
        setBasketRestaurant(restaurant);
    }, [restaurant])

    if (restaurant == null) {
        return (<ActivityIndicator size={'large'} />);
    }
    return (
        <View style={styles.page}>

            <FlatList
                ListHeaderComponent={() => <Header restaurant={restaurant} />}
                data={dishes}
                renderItem={({ item }) => <DishListItem dish={item} />}
                keyExtractor={(item) => item.name}
            />
            <Ionicons
                onPress={() => {
                    navigation.goBack();//goBack()
                }}
                name="arrow-back-circle"
                size={45}
                color="white"
                style={styles.iconContainer}
            />
            {basket && <Pressable onPress={() => navigation.navigate("Basket")} style={styles.button}>
                <Text style={styles.buttonText}>Go  to basket ({basketDishes.length})</Text>
            </Pressable>}

        </View>
    );
};



export default RestaurantDetailPage;

