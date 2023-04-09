import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailPage from '../screens/RestaurantDetailScreen';
import DishDetailScreen from '../screens/DishDetailScreen';
import Basket from '../screens/BasketScreen';
import OrderScreen from '../screens/OrdersScreen';
import OrderDetails from '../screens/OrderDetails';
import Profile from '../screens/ProfileScreen';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

//Auth
import { useAuthContext } from '../contexts/AuthContext';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const RootNavigator = () => {
    const { dbUser } = useAuthContext();
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            {
                dbUser ?
                    (<Stack.Screen
                        name='Welcome'
                        component={HomeTabs}
                    />) :
                    (
                        <Stack.Screen
                            name='Profile'
                            component={Profile}
                        />
                    )
            }


        </Stack.Navigator>
    );
}

const HomeTabs = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: 'white' }}>
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />
                }} />
            <Tab.Screen
                name='Orders'
                component={OrderNavigator}
                options={{ tabBarIcon: ({ color }) => <Fontisto name="prescription" size={24} color={color} /> }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name='HomeStart'
                component={HomeScreen}
            />
            <HomeStack.Screen
                name='Restaurant'
                component={RestaurantDetailPage}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name='DishDetails'
                component={DishDetailScreen}
            />
            <HomeStack.Screen
                name='Basket'
                component={Basket}
            />
        </HomeStack.Navigator>
    );
}

const OrderStack = createStackNavigator();

const OrderNavigator = () => {
    return (
        <OrderStack.Navigator>
            <OrderStack.Screen
                name='OrderStart'
                component={OrderScreen}
            />
            <OrderStack.Screen
                name='Order'
                component={OrderDetails}
            />
        </OrderStack.Navigator>
    );
}

export default RootNavigator;