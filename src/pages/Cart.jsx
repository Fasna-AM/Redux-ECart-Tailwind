import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../redux/slice/cartSlice'

const Cart = () => {

  const navigate = useNavigate()
  const dispatch =useDispatch()
  const userCart = useSelector(state => state.cartReducer)
  const [cartTotal,setCatrTotal] = useState(0)
  useEffect(()=>{
    if(userCart?.length>0){
      setCatrTotal(userCart?.map(item=>item.totalPrice)?.reduce((a,b)=>a+b))
    }
  },userCart)

  const handleDecrementQuantity = (product)=>{
    if(product.quantity>1){
      dispatch(decQuantity(product))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCkeckOut = ()=>{
    dispatch(emptyCart())
    alert("Order confirmed .... Thank you for purchasing with us !!!")
    navigate('/')
  }

  return (
    <>
      <HeaderComponent />
      <div style={{ paddingTop: "100px" }} className='container px-4 mx-auto'>
        {
          userCart?.length > 0 ? <>
            <h className="text-blue-600 font-bold text-5xl">Cart Summary</h>
            <div className="grid grid-cols-3 gap-4 mt-5">
              <div className="col-span-2 border rounded shadow p-5">
                {/* table */}
                <table className='table-auto w-full'>
                  <thead>
                    <tr>
                      <td className="font-semibold">#</td>
                      <td className="font-semibold">Name</td>
                      <td className="font-semibold">Image</td>
                      <td className="font-semibold">Quantity</td>
                      <td className="font-semibold">Price</td>
                      <td className="font-semibold">...</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userCart?.map((product, index) => (
                        <tr key={product?.id}>
                          <td>{index+1}</td>
                          <td>{product?.title}</td>
                          <td>
                            <img width={'70px'} height={"70px"} src={product?.thumbnail} alt="" />
                          </td>
                          <td>
                            <div className="flex">
                              <button onClick={()=>handleDecrementQuantity(product)} className='font-bold'>-</button>
                              <input type="text" readOnly value={product?.quantity} style={{ width: "40px" }} className='border p-1 ms-2 me-2 rounded font-bold' />
                              <button onClick={()=>dispatch(incQuantity(product))} className='font-bold'>+</button>
                            </div>
                          </td>
                          <td>{product?.totalPrice}</td>
                          <td> <button onClick={()=>dispatch(removeCartItem(product?.id))} className='text-red-600'><i className="fa-solid fa-trash"></i></button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <div className="float-right mt-4">
                  <button onClick={()=>dispatch(emptyCart())} className="bg-red-600 text-white p-2 rounded me-3">EMPTY CART</button>
                  <Link className='bg-blue-600 text-white p-2 rounded' to={'/'}>SHOP MORE</Link>
                </div>
              </div>
              <div className="col-span-1 border rounded shadow p-5">
                {/* checkout */}
                <h1 className="text-2xl font-bold">Total Amount : <span className="text-red-600"> ${cartTotal}</span></h1>
                <hr />
                <button onClick={handleCkeckOut} className="w-full bg-green-600 rounded p-5 text-white font-bold mt-5 text-xl">Checkout</button>
              </div>
            </div>
          </>
            :
            <div className='flex flex-col justify-center items-center'>
              <img src="https://www.adanione.com/~/media/Foundation/Adani/emptyImages/empty_cart.gif" alt="" />
              <h1 className="text-blue-600 font-bold text-3xl my-5">Your Cart is Empty!!!!</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Cart