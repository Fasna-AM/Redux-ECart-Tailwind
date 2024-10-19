import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Link } from 'react-router-dom'
Link

const PageNotFount = () => {
  return (
    <>
    <HeaderComponent/>
    <div style={{paddingTop:"100px"}} className='flex justify-center items-center flex-col'>
      <h1 className="font-bold text-8xl ">404</h1>
      <img width={'500px'}  src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="" />
      <h3 className="font-bold text-3xl">Looks Like You Are Lost</h3>
      <p>The page your looking for not available</p>
      <Link className='bg-green-600 text-white p-2 rounded' to={'/'}>Go To Home</Link>

    </div>
    </>
  )
}

export default PageNotFount