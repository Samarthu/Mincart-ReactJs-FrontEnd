
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  {Nav,Home,Unauthorised,Cart,Product,About,Products,Order,Orders,Signup,Login,AddProduct} from "./components"
import { Provider } from 'react-redux'
import {store } from "./store/store.js"



const router = createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"",
      element:< Home/>,

    },
    {
      path:"/home",
      element:< Home/>,

    },
    {
      path:"unuthorised",
      element:<Unauthorised/>
    },
    {
      path:"about",
      element:<About/>
    },
    {
      path:"addProduct",
      element:<AddProduct/>

    },
    {
      path:"cart",
      element:<Cart/>
    },
    {
      path:"product",
      element:<Product/>
    },
    {
      path:"products",
      element:<Products/>
    },
    {
      path:"order/:id",
      element:<Order/>
    },
    {
      path:"orders",
      element:<Orders/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"signup",
      element:<Signup/>
    }
  ]
}

])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
 </Provider>
</React.StrictMode>
)
