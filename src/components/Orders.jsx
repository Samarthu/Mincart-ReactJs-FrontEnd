import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {getUserInfo} from "../utils/userLoggedIn"

const Orders = () => {
  // const orderData = [
  //   {
  //     _id: "653b9a060a14a91a824f8b77",
  //     user: {
  //       _id: "653a9d4e8e37b60d0f32e125",
  //       name: "Sam",
  //       accountType: "customer",
  //       email: "sam3@gmail.com",
  //       password: "abc@1433",
  //       role: "admin",
  //       profileImage: "../Images/UserIcon.png",
  //       __v: 0
  //     },
  //     products: [
  //       {
  //         product: { name: "Product 1" },
  //         quantity: 3,
  //         _id: "653b9a060a14a91a824f8b78"
  //       },
  //       {
  //         product: { name: "Product 2" },
  //         quantity: 2,
  //         _id: "653b9a060a14a91a824f8b79"
  //       }
  //     ],
  //     totalAmount: 59.97,
  //     orderDate: "2023-10-27T11:07:50.448Z",
  //     __v: 0
  //   },
  //   {
  //     _id: "653b9a060a14a91a824f8b78",
  //     user: {
  //       _id: "653a9d4e8e37b60d0f32e126",
  //       name: "Alice",
  //       accountType: "customer",
  //       email: "alice@gmail.com",
  //       password: "def@4567",
  //       role: "user",
  //       profileImage: "../Images/UserIcon.png",
  //       __v: 0
  //     },
  //     products: [
  //       {
  //         product: { name: "Product 3" },
  //         quantity: 1,
  //         _id: "653b9a060a14a91a824f8b80"
  //       },
  //       {
  //         product: { name: "Product 4" },
  //         quantity: 4,
  //         _id: "653b9a060a14a91a824f8b81"
  //       }
  //     ],
  //     totalAmount: 75.25,
  //     orderDate: "2023-10-28T14:25:00.123Z",
  //     __v: 0
  //   },
  //   {
  //     _id: "653b9a060a14a91a824f8b79",
  //     user: {
  //       _id: "653a9d4e8e37b60d0f32e127",
  //       name: "Bob",
  //       accountType: "customer",
  //       email: "bob@gmail.com",
  //       password: "ghi@7890",
  //       role: "user",
  //       profileImage: "../Images/UserIcon.png",
  //       __v: 0
  //     },
  //     products: [
  //       {
  //         product: { name: "Product 5" },
  //         quantity: 2,
  //         _id: "653b9a060a14a91a824f8b82"
  //       }
  //     ],
  //     totalAmount: 34.50,
  //     orderDate: "2023-10-29T09:15:20.567Z",
  //     __v: 0
  //   },
  //   {
  //     _id: "653b9a060a14a91a824f8b80",
  //     user: {
  //       _id: "653a9d4e8e37b60d0f32e128",
  //       name: "Eva",
  //       accountType: "customer",
  //       email: "eva@gmail.com",
  //       password: "jkl@2345",
  //       role: "user",
  //       profileImage: "../Images/UserIcon.png",
  //       __v: 0
  //     },
  //     products: [
  //       {
  //         product: { name: "Product 6" },
  //         quantity: 1,
  //         _id: "653b9a060a14a91a824f8b83"
  //       },
  //       {
  //         product: { name: "Product 7" },
  //         quantity: 2,
  //         _id: "653b9a060a14a91a824f8b84"
  //       }
  //     ],
  //     totalAmount: 45.75,
  //     orderDate: "2023-10-30T16:40:30.789Z",
  //     __v: 0
  //   },

  // ];
  
  const [orderData,setOrders] = useState([])
  
  useEffect(()=>{
    let user = getUserInfo()
    let url = '/api/order/user/'+ user._id
    axios.get(url).then((res)=>{
     if(res.status  == 200 && res.data.status =='green'){
       setOrders(res.data.data)
     }
     else{
       showErrorToast(res.data.message)
     }

    }).catch((err)=>{
      showErrorToast(JSON.stringify(err.message) + err.response.data.message)

    })

  },[])


   
  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border py-2 px-4 md:px-6 lg:px-8">Sr No</th>
            <th className="border py-2 px-4 md:px-6 lg:px-8">Order ID</th>
            <th className="border py-2 px-4 md:px-6 lg:px-8">Order Date</th>
            <th className="border py-2 px-4 md:px-6 lg:px-8">User Name</th>
            <th className="border py-2 px-4 md:px-6 lg:px-8">User Email</th>
            <th className="border py-2 px-4 md:px-6 lg:px-8">Total Amount</th>
            <th className="border py-2 px-4 md:px-6 lg:px-8">Order Items</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order, index) => (
            <tr key={index}>
              <td className="border py-2 px-4 md:px-6 lg:px-8">{index + 1}</td>
              <td className="border py-2 px-4 md:px-6 lg:px-8">{order._id}</td>
              <td className="border py-2 px-4 md:px-6 lg:px-8">{new Date(order.orderDate).toLocaleString()}</td>
              <td className="border py-2 px-4 md:px-6 lg:px-8">{order.user.name}</td>
              <td className="border py-2 px-4 md:px-6 lg:px-8">{order.user.email}</td>
              <td className="border py-2 px-4 md:px-6 lg:px-8">Rs.{order.totalAmount.toFixed(2)}</td>
              <td className="border py-2 px-4 md:px-6 lg:px-8">
                <ul className="list-disc pl-4">
                  {order.products.map((orderItem, itemIndex) => (
                    <li key={itemIndex}>
                      {orderItem.product ? `${orderItem.product.name} (Qty: ${orderItem.quantity})` : 'N/A'}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default Orders;

