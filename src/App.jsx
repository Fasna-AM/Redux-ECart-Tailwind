
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import View from './pages/View'
import PageNotFount from './pages/PageNotFount'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/wishList'} element={<WishList/>}/>
      <Route path={'/cart'} element={<Cart/>}/>
      <Route path={'/:id/view'} element={<View/>}/> 

      {/* // dynamic changed value indicated by " : " */}
      
      <Route path={'/*'} element={<PageNotFount/>}/>


    </Routes>
    <Footer/>
    </>
  )
}

export default App
