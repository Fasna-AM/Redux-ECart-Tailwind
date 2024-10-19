import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList } from '../redux/slice/whishListSlice'
import { addToCart } from '../redux/slice/cartSlice'

const View = () => {

  const {id} = useParams()
  // console.log(id);
  const [products,setProducts] = useState({})
  const userCart = useSelector(state=>state.cartReducer)
  const userWishList = useSelector(state=>state.wishListReducer)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProducts(allProducts?.find(item=>item.id==id))
    }
  },[])
  
// console.log(products);

const handleWishList = (products)=>{
  const existingProduct = userWishList?.find(item=>item.id==products.id)
  if(existingProduct){
    alert("Products already in your WishList!!!")

  }else{
    dispatch(addToWishList(products))
  }
}

const handleCart = (products)=>{

  dispatch(addToCart(products))
  const existingProduct = userCart?.find(item=>item.id==products.id)
  if(existingProduct){
    alert("Products quantity is incrementing!!!")
  }
}



  return (
    <>
      <HeaderComponent />
      <div style={{ paddingTop: "70px" }} className="flex content-center items-center mx-5">
        <div className="grid grid-cols-2 items-center">
          <img width={'100%'} height={"250px"} src={products?.thumbnail}alt="" />
        </div>
        <div>
          <h3 className='my-5'>PID:{products?.id}</h3>
          <h1 className="text-5xl font-bold">{products?.title}</h1>
          <h4 className="font-bold text-red-600 text-2xl">{products?.price}</h4>
          <h4>Brand : {products?.brand}</h4>
          <h4>Category : {products?.category}</h4>
          <p>
            <span className="font-bold">Description</span>:{products?.description}
          </p>

          <div className="flex justify-evenly mt-5">
            <button onClick={()=>handleWishList(products)} className="text-white bg-blue-500 rounded p-2">ADD TO WISHLIST</button>
            <button onClick={()=>handleCart(products)} className="text-white bg-green-500 rounded p-2">ADD TO CART</button>

          </div>
          <h3 className="font-bold text-2xl my-5">Client Review</h3>
          {
            products?.reviews?.length>0 ?
              products?.reviews.map((item,index)=>(
                <div key={index} className='border shadow rounded p-2 my-2'>
                  <h5>
                    <span>{item?.reviewerName} : <span>{item?.comment}</span></span>
                  </h5>
                  <p>Rating: {item?.rating}</p>
                </div>
              ))
              :
              <p className="font-bold text-red-600">No Reviews yet !!!</p>
          }
          
        </div>
      </div>

    </>
  )
}

export default View