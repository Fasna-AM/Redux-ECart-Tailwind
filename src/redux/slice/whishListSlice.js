import { createSlice } from "@reduxjs/toolkit"

const wishListSlice = createSlice({
    name: "wishList",
    initialState:[],
    reducers:{
        addToWishList:(state,dataFromView)=>{
            state.push(dataFromView.payload)
        },
        removeWishListItem:(state,dataFromWishList)=>{
            return state.filter(item=>item.id!=dataFromWishList.payload)
        }
    }
})

export const {addToWishList,removeWishListItem} = wishListSlice.actions
export default wishListSlice.reducer