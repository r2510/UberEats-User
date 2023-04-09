import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const DishListItem = ({ dish }) => {
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={()=>navigation.navigate("DishDetails", {id:dish.id})}>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{dish.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>
                <Text style={styles.price}>Rs {dish.price}</Text>
            </View>
            {/* adding condition in RN */}
            {dish.image && (<Image source={{ uri: dish.image }} style={styles.image} />)}
        </Pressable>
    );
}
export default DishListItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    name: {
        fontWeight: '600',
        fontSize: 17,
        letterSpacing: 0.5
    },
    description: {
        color: 'grey',
        marginVertical: 5
    },
    price: {
        fontSize: 16
    },
    image: {
        height: 100,
        aspectRatio: 1
    }
});