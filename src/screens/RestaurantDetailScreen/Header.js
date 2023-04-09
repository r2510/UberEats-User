import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const Header = ({restaurant}) => {
    const DEFAULT_IMAGE = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg";
    
    return (
        <View style={styles.page}>
            <Image
                source={{ uri: restaurant.image.startsWith('http') ? restaurant.image : DEFAULT_IMAGE  }}
                style={styles.image}
            />

            <View style={styles.container}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.subtitle}>Rs
                    {restaurant.deliveryFee.toFixed(2)} ​&#8226; {restaurant.minDeliveryTime}-
                    {restaurant.maxDeliveryTime} mins
                </Text>
                <Text style={styles.menuTitle}>Menu</Text>
            </View>
        </View>
    );
}
export default Header;