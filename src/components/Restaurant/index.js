import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantItem = (props) => {

    const navigation = useNavigation();
    const { restaurant } = props;
    const onPress = () =>{
        navigation.navigate("Restaurant",{id:restaurant.id});
    }
    const DEFAULT_IMAGE = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg";
    return (
        <Pressable onPress={onPress} style={styles.restaurentContainer}>
            <Image
                style={styles.image}
                source={{ uri: restaurant.image.startsWith('http') ?restaurant.image : DEFAULT_IMAGE }}
            />
            <View style={styles.row}>
                <View>
                    <Text style={styles.restaurentName}>{restaurant.name}</Text>
                    <Text style={styles.restaurentInfo}>Rs{(restaurant.deliveryFee).toFixed(2)} ​&#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} mins</Text>
                </View>
                <View style={styles.rating}>
                    <Text>{(restaurant.rating).toFixed(1)}</Text>
                </View>
            </View>
        </Pressable>
    );
}
export default RestaurantItem;

const styles = StyleSheet.create({
    restaurentContainer: {
        width: '100%',
        marginVertical: 10
    },
    image: {
        width: '100%',
        aspectRatio: 5 / 3,
        marginBottom: 5
    },
    restaurentName: {
        fontSize: 18,
        fontWeight: '800',
        marginVertical: 5
    },
    restaurentInfo: {
        color: 'grey',
        fontSize: 15
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    rating:{
        marginLeft:'auto',
        backgroundColor:'lightgrey',
        width:40,
        height:30,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    }
})