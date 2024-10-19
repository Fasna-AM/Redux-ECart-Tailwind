import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishListItem } from '../redux/slice/whishListSlice'
import { addToCart } from '../redux/slice/cartSlice'

const WishList = () => {

  const userCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const userWishList = useSelector(state => state.wishListReducer)

  const handleCart = (products)=>{
    dispatch(addToCart(products))
    const existingProduct = userCart?.find(item=>item.id==products.id)
    dispatch(removeWishListItem(products.id))
    if(existingProduct){
      alert("Products quantity is incrementing!!!")
  
    }
  }

  return (
    <>
      <HeaderComponent />
      <div style={{ paddingTop: "100px" }} className='container px-4 mx-auto'>
        {
          userWishList?.length > 0 ?
            <>
              <h1 className="text-5xl font-bold text-red-500">My Whishlist</h1>
              <div className="grid grid-cols-4 gap-4 mt-5">
                {
                  userWishList?.map(product => (
                    <div key={product?.id} className="rounded border p-2 shadow">
                      <img width={'100%'} height={"200px"} src={product?.thumbnail}alt="" />
                      <div className="text-center">
                        <h3 className="text-xl fond-bold">{product?.title}</h3>
                        <div className="flex justify-evenly mt-3">
                          <button onClick={()=>dispatch(removeWishListItem(product?.id))} className="text-xl"><i className="fa-solid fa-heart-circle-xmark text-red-600"></i></button>
                          <button onClick={()=>handleCart(product)} className="text-xl"><i className="fa-solid fa-cart-plus text-green-600"></i></button>

                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
            :
            <div className='flex flex-col justify-center items-center'>
              <img src="https://bakestudio.in/assets/images/cart/empty-cart.gif" alt="" />
              <h1 className="text-blue-600 font-bold text-3xl my-5">Your Wishlist is Empty!!!!</h1>
            </div>
        }
      </div>

    </>)
}

export default WishList