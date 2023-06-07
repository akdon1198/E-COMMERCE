import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name : "cart",
    initialState:{
        products : [],
        quantity : 0,
        total : 0,
    },
    reducers : {
        addProduct : (state, action) =>{
            state.quantity += 1
            state.total += action.payload.price * action.payload.quantity
            if(state.products.length == 0){
                action.payload.price = action.payload.price * action.payload.quantity
                state.products.push(action.payload)
            }else{
                let check = true
                let newarr = state.products.map((item) => {
                                if(item._id === action.payload._id){
                                    item.price += action.payload.price * action.payload.quantity
                                    item.quantity += action.payload.quantity
                                    check = false
                                }
                                return item
                            })
                if(check){
                    action.payload.price = action.payload.price * action.payload.quantity
                    newarr.push(action.payload)
                } 
                state.products = newarr
            }
        },
        removeProduct: (state, action) => {
            let newarr = state.products.filter((item) => {
                if(item._id == action.payload){
                    state.total -= item.price
                }else{
                    return item
                }
            })
            state.products = newarr
        },
        cartReset : (state) => {
            state.quantity = 0
        }
    }
})

export const {addProduct, removeProduct, cartReset} = cartSlice.actions
export default cartSlice.reducer