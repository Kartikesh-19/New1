import React,{useReducer} from 'react'
import CartContext from './cart-context'

const defaultState={
items:[],
totalAmount:0
}
const reducer=(state,action)=>{
    console.log(state.items);
if(action.type==='ADD'){
    const updatedTotalAmount=state.totalAmount + action.item.price +action.item.amount;
    const existingCartItemIndex=state.items.findIndex(item=>item.id === action.item.id);
    console.log(existingCartItemIndex,'dsasfs');
    const existingCartItem=state.items[existingCartItemIndex]
    let updatedItem;
    let updatedItems;
    if(existingCartItem){
        updatedItem={
            ...existingCartItem,
            amount:existingCartItem.amount + action.item.amount
        };
        updatedItems=[...state.items];
        updatedItems[existingCartItemIndex]=updatedItem;
    }else{
        updatedItems=state.items.concat(action.item)
    }
    
    
 
return{
    items:updatedItems,
    totalAmount:updatedTotalAmount
}}
// else if(action.type==='REMOVE'){

// }

return(defaultState)
}

const CartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const addItemToCartHandler= (item) =>{
    dispatch({type:'ADD',item:item})
    }
    const removeItemToCartHandler= (id) =>{
        dispatch({type:'REMOVE',id:id})
    }
    const cartContext={
        items:state.items,
        totalAmount:state.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemToCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
