import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast,showErrorToast } from '../utils/toastUtils';
import axios from 'axios';



const  ProductForm = () => {
    const userstore = useSelector(state => state.userstore)
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: '',
        description: '',
        type: '',
        vendor: '',
        image: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value,type } = e.target;
        if(type === 'file'){
            setProduct({ ...product, [name]: e.target.files[0] });
        }
        else{
            setProduct({ ...product, [name]: value });
        }
    };
    

    const validation = () => {
        if (!product.name) {
          showErrorToast('Product Name is Mandatory');
          return false;
        }
      
        if (!product.description) {
          showErrorToast('Product Description is Mandatory');
          return false;
        }
      
        if (!product.type) {
          showErrorToast('Product Type is Mandatory');
          return false;
        }
      
        if (!product.vendor) {
          showErrorToast('Vendor Name is Mandatory');
          return false;
        }
      
        if (!product.image) {
          showErrorToast('Product Image is Mandatory');
          return false;
        }
      
        if (!product.price) {
          showErrorToast('Product Price is Mandatory');
          return false;
        }
      
        return true; // All fields are valid
      };
      
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!validation()){
            return;
        }
        console.log(product.name)
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('type', product.type);
        formData.append('vendor', product.vendor);
        formData.append('image', product.image);
        formData.append('price', product.price);
        formData.append('createdBy',userstore._id)
    
        // Example: Send formData to your API for image upload and product creation
        console.log('Product data submitted:', formData);

        try {
            // Send a POST request to your backend API
            const response = await axios.post('/api/product/addProduct', formData);
      
            // Handle the response as needed
            console.log('Product created:', response.data);
            if(response.status == 200){
                showSuccessToast("Product Uploaded Successfully")
                setProduct({name: '',
                description: '',
                type: '',
                vendor: '',
                image: null,
                price: '',})
            }
            else{
                showErrorToast('Getting Error :' + JSON.stringify(resp.data.message))
            }
          } catch (error) {
            showErrorToast(JSON.stringify(error.message) + error.response.data.message)
          }
    };

    useEffect(()=>{
        let userInfo = JSON.parse(Cookies.get('userInfo'))

        if(userInfo.role != 'admin' &&  userInfo.role != 'owner'){
            navigate('/')
        }
    },[])

  return (
    <div className="mt-2 max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block font-medium">Product Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={product.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vendor" className="block font-medium">Vendor Name</label>
          <input
            type="text"
            id="vendor"
            name="vendor"
            value={product.vendor}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-medium">Image Upload</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-medium">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
