import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { showErrorToast,showSuccessToast } from '../utils/toastUtils';
import {getUserInfo} from "../utils/userLoggedIn"

const Products = () => {
  const [products, setProducts] = useState([]);
  const userstore = useSelector(state => state.userstore)


  const [editingProduct, setEditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const openEditModal = (product) => {
    setEditingProduct(product);
    setNewPrice(product.price);
    setNewDescription(product.description);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };

  const saveChanges = async () => {

    try{
      const res = await axios.patch('/api/product/'+editingProduct._id,{price:newPrice,description:newDescription})
      if(res.status== 200 && res.data.status  == 'green'){
        showSuccessToast('Product is Edited Successfully')
      }
      else{
        showErrorToast('Getting Error :' + JSON.stringify(res.data.message))

      }
    }catch(err){
      console.log(err)
      showErrorToast(JSON.stringify(err.message) + err.response.data.message)
    }
    


    const updatedProducts = products.map((product) => {
      if (product.id === editingProduct.id) {
        return { ...product, price: newPrice, description: newDescription };
      }
      return product;
    });

    setProducts(updatedProducts);
    closeEditModal();
  };

  const deleteProduct = async (id) => {

    let confir = confirm("Are you sure you really want to delete the product?..")
    if(!confir){
      return;
    }
    try{
      const res = await axios.delete('/api/product/'+id)
      if(res.status== 200 && res.data.status  == 'green'){
        showSuccessToast('Product is Deleted Successfully')
      }
      else{
        showErrorToast('Getting Error :' + JSON.stringify(res.data.message))

      }
    }catch(err){
      console.log(err)
      showErrorToast(JSON.stringify(err.message) + err.response.data.message)
    }
    
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
  };


  useEffect(()=>{
    let user = getUserInfo()
    let url = '/api/product/user/'+ user._id
    axios.get(url).then((res)=>{
     if(res.status  == 200 && res.data.status =='green'){
       setProducts(res.data.data)
     }
     else{
       showErrorToast(res.data.message)
     }

    }).catch((err)=>{
      showErrorToast(JSON.stringify(err.message) + err.response.data.message)

    })
  },[])


  return (
    <div className="mt-6 mb-6">
  <h1 className="text-3xl font-semibold mb-4 pl-2">My Products</h1>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden ml-2 mr-3">
      <thead>
        <tr className="bg-gray-100">
          <th className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">Product Name</th>
          <th className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">Price</th>
          <th className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">Description</th>
          <th className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">Image</th>
          <th className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">{product.name}</td>
            <td className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">{product.price}</td>
            <td className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">{product.description}</td>
            <td className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">
              <img src={"/images/" + product.image} alt={product.name} className="w-16 h-16 object-cover" />
            </td>
            <td className="border py-2 px-4 md:px-6 lg:px-8 xl:px-10">
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => openEditModal(product)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {editingProduct && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600"
          onClick={saveChanges}
        >
          Save Changes
        </button>
        <button
          className="ml-2 text-red-500 hover:text-red-700"
          onClick={closeEditModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

  
  );
};

export default Products;
