import {useState, useContext, createContext, useEffect} from 'react';
import { DataStore } from 'aws-amplify';
import { Order, OrderDish, Basket, Restaurant, Dish } from '../models';

import { useAuthContext } from './AuthContext';
import { useBasketContext } from './BasketContext';

const OrderConText = createContext({});


const OrderContextProvider = ({children}) =>{

    const {dbUser} = useAuthContext();
    const {restaurant, totalPrice, basketDishes, basket} = useBasketContext();

    const [orders, setOrders] = useState([]);
    const [orderRestaurant, setOrderRestaurant] = useState();

    useEffect(()=>{
        DataStore.query(Order, o => o.userID.eq(dbUser.id)).then(setOrders);
    },[dbUser]);
    
    const createOrder = async ( ) => {
        //create the order
        const newOrder = await DataStore.save(new Order({
            userID:dbUser.id,
            Restaurant:restaurant,
            status:'NEW',
            total: totalPrice
        }));

        //updating basketDishes array
        const updatedBasketDishes = await basketDishes.map( async (oneBasket) =>({
            ...oneBasket,
            Dish: await getDish(oneBasket.basketDishDishId)
        }))
        const finalResult = await Promise.all(updatedBasketDishes);
        // final.map(d=>console.log('finallll', d));
        //add all basket dishes to the order
        await Promise.all(
            finalResult.map( basketDish =>
                DataStore.save(
                    new OrderDish({
                        quantity:basketDish.quantity,
                        orderID:newOrder.id,
                        Dish: basketDish.Dish
                    })
                )
            )
        );
        //delete basket
        // await DataStore.delete(basket);

        setOrders([...orders, newOrder]);
    };

    const getDish = async(id) =>{
        return await DataStore.query(Dish, id);
    }

    const getOrder = async (id) =>{
        const fetchOrder = await DataStore.query(Order, id);
        const fetchRestaurant = await DataStore.query(Restaurant, fetchOrder.orderRestaurantId);
        const orderDishes = await DataStore.query(OrderDish, od =>
                od.orderID.eq(id)
            )
        return {curOrder: fetchOrder, curRes:fetchRestaurant , dishes: orderDishes};
    }

    return(
        <OrderConText.Provider value={{createOrder, orders, getOrder }}>
        {children}
        </OrderConText.Provider>
    );
};
export default OrderContextProvider;
export const useOrderContext = ()=>useContext(OrderConText);