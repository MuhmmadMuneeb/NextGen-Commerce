import Layout from './components/auth/Layout'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminFeatures from './pages/admin-view/AdminFeatures'
import AdminOrders from './pages/admin-view/AdminOrders'
import Notfound from './pages/not-found/Notfound'
import ShoppingHome from './pages/shopping-view/ShoppingHome'
import ShoppingListing from './pages/shopping-view/ShoppingListing'
import ShoppingAccount from './pages/shopping-view/ShoppingAccount'
import ShoppingCheckout from './pages/shopping-view/ShoppingCheckout'
import Unauth from './pages/unauth/Unauth'
import CheckAuth from './pages/comman/Checkauth'
import AdminLayout from './components/admin-view/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth_slice'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import Contact from './pages/shopping-view/Contact'
import About from './pages/shopping-view/About'
import AdminDesignManager from './pages/admin-view/AdminDesignManager'
import Success from './pages/shopping-view/Success'

const App = () => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading} > <AdminLayout /> </CheckAuth>} >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path="slider" element={<AdminDesignManager />} />
          <Route path="popup" element={<AdminDesignManager />} />
        </Route>
        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading} > <ShoppingLayout /> </CheckAuth>}>
          <Route index element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='about' element={<About />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='contact' element={<Contact />} />
          <Route path='success' element={<Success />} />
          <Route path='cancel' element={<Contact />} />
        </Route>

        <Route path='*' element={<Notfound />} />
        <Route path='/unauth-page' element={<Unauth />} />
      </Routes>
    </>
  )
}

export default App
