import { useCallback } from 'react'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import { useDispatch,useSelector } from 'react-redux'


const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const cartstore = useSelector(state => state.cartstore)
  let count = 0

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/product/');

      if (res.status === 401) {
        // Redirect to the login page
        navigate('/login');
      } else {
        console.log(res);
        setProducts(res.data.data);
      }
    } catch (error) {
      if (error.response && (error.response.status === 401)) {
        // Redirect to the login page in case of a redirection
        navigate('/login');
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };
  const getQuantity = (id) =>{
    if(cartstore.length){
      for(let i=0;i<cartstore.length;i++){
         if(cartstore[i].id == id)
         {
          count = cartstore[i].quantity
          return cartstore[i].quantity
         }
      }
    }
    return 0;
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {products &&  products.map((product) => (
          <Product key={product._id} product={{...product,quantity:getQuantity(product._id)}} cart={ count == 1 ?true:false} />
        ))}
      </div>
    </div>

  );
};

export default Home;