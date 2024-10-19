import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slice/productSlice'


const Home = () => {
  const dispatch = useDispatch()
  const { allProducts, loading, error } = useSelector(state => state.productReducer)
  // console.log(allProducts,loading,error);
  const [currentPage,setCurrentPage] =useState(1)
  const productPerPage = 8
  const totalPage = Math.ceil(allProducts?.length/productPerPage)
  const currentPageLastIndex = currentPage * productPerPage
  const currentPageFirstIndex = currentPageLastIndex - productPerPage
  const visigleProductCardds = allProducts?.slice(currentPageFirstIndex,currentPageLastIndex)


  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])


  const navigateToNextPage = ()=>{
    if(currentPage!=totalPage){
      setCurrentPage(currentPage+1)
    }
  }
  const navigateToPreviousPage = () =>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <>
      <HeaderComponent insideHome={true} />
      <div style={{ paddingTop: "100px" }} className='container px-4 mx-auto'>
        {
          loading ?
            <div className="flex justify-center items-center my-5 text-lg">
              <img width={'70px'} height={'70px'} src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="" /> Loading....
            </div>
            :
            <>
              <div className="grid grid-cols-4 gap-4 m-5">
                {
                  allProducts?.length > 0 ?
                    visigleProductCardds?.map(product => (
                      <div key={product?.id} className="rounded border p-2 shadow">
                        <img width={'100%'} height={"200px"} src={product?.thumbnail} alt="" />
                        <div className="text-center">
                          <h3 className="text-xl fond-bold">{product?.title}</h3>
                          <Link className='bg-gray-600 rounded p-1 mt-3 text-white inline-block' to={`${product?.id}/view`}>View More...</Link>
                        </div>
                      </div>
                    ))
                    :
                    <div className="flex justify-center items-center text-red-600 my-5 text-lg">
                      Product Not Found!!!
                    </div>
              }
              </div>
              <div className="text-center text-2xl font-bold my-30">
                <span onClick={navigateToPreviousPage} className='cursor-pointer'><i className="fa-solid fa-backward me-5"></i></span>
                <span>{currentPage} of {totalPage}</span>
                <span onClick={navigateToNextPage} className='cursor-pointer '><i className="fa-solid fa-forward ms-5"></i></span>

              </div>
            </>
        }
      </div>

    </>
  )
}

export default Home