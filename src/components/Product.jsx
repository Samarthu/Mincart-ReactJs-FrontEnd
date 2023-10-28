import React ,{useEffect, useState}from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart,incrementCount,decrementCount,removeFromCart } from '../slices/cartSlice';
import { showErrorToast } from '../utils/toastUtils';

const Product = ({product,cart=false}) => {
  const dispatch = useDispatch()
  const [quantity,setQuantity] = useState(product.quantity)
  const userstore = useSelector(state => state.userstore)
  const cartstore = useSelector(state => state.cartstore)





  const handleAddToCart = (product) => {
    setQuantity(quantity + 1)
    dispatch(incrementCount({id:product._id}))
   
  };

  const handleRemoveFromCart = (product) => {
    if(quantity == 0){
      showErrorToast('Invalid Operation')
      //dispatch(removeFromCart({id:product._id,data:product,quantity:quantity}))
      return;
    }
    setQuantity((oldValue) =>  oldValue - 1)
    if(quantity == 0){
      dispatch(removeFromCart({id:product._id,data:product,quantity:quantity}))
    }else{
      dispatch(decrementCount({id:product._id}))
    }
    
  };
  const getQuantity=()=>{
    if(cartstore.length){
      for(let i=0;i<cartstore.length;i++){
         if(cartstore[i].id == product._id)
         {
          console.log(cartstore[i])
          return cartstore[i].quantity

         }
      }
    }
    return 0;
  }

  useEffect(()=>{
    if(quantity==0){
      dispatch(removeFromCart({id:product._id,data:product,quantity:quantity}))
    }
    else if(quantity == 1 && !cart){
      console.log('added')
      dispatch(addToCart({id:product._id,data:product,quantity:quantity}))
    }

  },[quantity])


  return (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-auto h-40 mx-auto mb-4">
              <img src={ "/images/"+ product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-700 mt-2">{product.description}</p>
            <p className="text-gray-600">Rs.{product.price}</p>
            <div className="flex items-center mt-4">
              <button
                onClick={() => handleRemoveFromCart(product)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                -
              </button>
              <span className="text-xl mx-2">{getQuantity()}</span>
              <button
                onClick={() => handleAddToCart(product)}
                className="px-3 py-1 bg-green-500 text-white rounded-md"
              >
                +
              </button>
            </div>
        </div>
  );
}

export default Product
