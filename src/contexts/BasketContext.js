import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish } from "../models";

import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({children})=>{

    // sub from AuthContext
    const { dbUser } = useAuthContext();

    const [restaurant, setRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);
    const [basketDishes, setBasketDish] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        DataStore.query(Basket, bskt=> bskt.and(b =>[
            b.restaurantID.eq(restaurant.id),
            b.userID.eq(dbUser.id)
        ])).then(baskets=>setBasket(baskets[0]));
    }, [dbUser, restaurant]);

    useEffect(()=>{
        DataStore.query(BasketDish, bd => bd.basketID.eq(basket.id)).then(setBasketDish)
        console.log('useEffect basket', basketDishes);
    },[basket])

    useEffect(()=>{
        queryDish();
    }, [basketDishes]);

    const queryDish = async ()=>{
        
        basketDishes.forEach(async (element) => {
            const dishes = await DataStore.query(Dish, (d)=>d.id.eq(element.basketDishDishId));
            setTotalPrice(totalPrice+dishes.price);
        });
        setTotalPrice(totalPrice+restaurant.deliveryFee);
    };

    const addDishToBasket = async (dish, cart) =>{
        //get the existing basket or create a new one
        let curBasket = !basket ? await createNewBasket() : basket;

        //create a BasketDish item and save to Datastore
        //newBasketDish variable just for that count of Basket dishes
        const newBasketDish = DataStore.save(new BasketDish({
            quantity: cart,
            Dish:dish,
            basketID:curBasket.id
        }))
        setBasketDish([...basketDishes, newBasketDish])
        console.log('addDishToBasket basketDishes', basketDishes);
    };

    const createNewBasket = async () =>{
        const newBasket = await DataStore.save(new Basket({
            userID: dbUser.id,
            restaurantID:restaurant.id
        }));
        setBasket(newBasket);
        return newBasket;
    }

    return(
        <BasketContext.Provider value={{addDishToBasket, setRestaurant, basket, basketDishes, restaurant, totalPrice}}>
            {children}
        </BasketContext.Provider>
    );
}
export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);