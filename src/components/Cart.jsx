import React,{useState,useReducer,useEffect} from 'react'
import Product from './Product'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import { showErrorToast ,showSuccessToast} from '../utils/toastUtils'
import { emptyCart } from '../slices/cartSlice'




const Cart = () => {
  const cartstore = useSelector(state => state.cartstore)
  const userstore = useSelector(state => state.userstore)
  const dispatch = useDispatch()
  

  const [products,setProducts] = useState([])
  const [totalPrice,setPrice] = useState(0)

  const product_value_setting=()=>{
    let produscts = cartstore.map((d)=>{
      let obj = {...d.data}
      obj.quantity = d.quantity
      return obj;
    })
    console.log(produscts,"--",cartstore)
    setProducts(produscts)
  }
  const calculateTotalPrice =() =>{
    let price = 0;
    cartstore.forEach((d)=>{
      price += (parseInt(d.quantity) * parseFloat(d.data.price))
    })
    setPrice(price)
    return price;
  }

  const generatePayload = () =>{
    return {
      user:userstore._id,
      products: cartstore.map((d)=>{
         return {product:d.data._id,quantity:d.quantity}
      }),
      totalAmount:totalPrice,
      createdBy:userstore._id
    }
  }
  const callToProceed = async()=>{
    let payload = generatePayload()
    try{
      const res = await axios.post('/api/order/addOrder',payload)
      if(res.status== 200 && res.data.status  == 'green'){
        showSuccessToast('Order is Placed SuucessFully')
        console.log(res.data.data)    
        dispatch(emptyCart([]))
        navigate("/home")
      }
      else{
        showErrorToast('Getting Error :' + JSON.stringify(res.data.message))

      }
    }catch(err){
      console.log(err)
      showErrorToast(JSON.stringify(err.message) + err.response.data.message)
    }
  }

  const purchase = () =>{
    product_value_setting()
    let price = calculateTotalPrice()
    let res = confirm('Are you Sure you want to purchase the order of price Rs.' + price)
    console.log(res)
    if(res){
      callToProceed()
    }

  }




  useEffect(()=>{
    //product_value_setting()
  },[])
  return (
    <div className="container mx-auto">
      <div className='flex justify-between mt-2'>
      <h2 className="text-3xl font-semibold mb-4">Cart List</h2>
      { cartstore.length? <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105" onClick={purchase}> Checkout</button>:""}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {cartstore &&  cartstore.map((product) => (
          <Product key={product.data._id} product={{...product.data,quantity:product.quantity}} cart={product.quantity ==1 ?true:false} />
        ))}
      </div>
    </div>
  )
}

export default Cart
