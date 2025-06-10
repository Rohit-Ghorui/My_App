import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Placeorder = () => {
  const [method, setMethod] = useState('COD');
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangerHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const productInfo = products.find((p) => p._id === productId);
            if (productInfo) {
              const itemInfo = { ...productInfo };
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      //console.log('Submitting Order:', orderData);

      switch(method){
        case 'COD':
          const response =await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
            const responseStripe= await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url}= responseStripe.data
              window.location.replace(session_url)
            }
            else{
              toast.error(responseStripe.data.message)
            }
        break;

        default:
          break;
      }

      
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

 return (
  <div className="flex flex-col sm:flex-row justify-between gap-12 pt-6 sm:pt-16 min-h-[80vh] border-t px-4 sm:px-10 bg-white text-gray-800">
    {/* Left: Delivery Info Form */}
    <div className="flex flex-col gap-6 w-full sm:max-w-[480px]">
      <Title text1="Delivery" text2="Information" />
      <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
        {/* Personal Info */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name</label>
          <div className="flex gap-3">
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangerHandler}
              type="text"
              placeholder="First Name"
              className="border border-yellow-500 rounded px-3 py-2 w-1/2"
            />
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangerHandler}
              type="text"
              placeholder="Last Name"
              className="border border-yellow-500 rounded px-3 py-2 w-1/2"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Contact</label>
          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangerHandler}
            type="email"
            placeholder="Email Address"
            className="border border-yellow-500 rounded px-3 py-2"
          />
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChangerHandler}
            type="tel"
            placeholder="Phone Number"
            className="border border-yellow-500 rounded px-3 py-2"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Shipping Address</label>
          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangerHandler}
            type="text"
            placeholder="Street"
            className="border border-yellow-500 rounded px-3 py-2"
          />
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangerHandler}
            type="text"
            placeholder="City"
            className="border border-yellow-500 rounded px-3 py-2"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangerHandler}
            type="text"
            placeholder="State"
            className="border border-yellow-500 rounded px-3 py-2"
          />
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangerHandler}
            type="number"
            placeholder="Zip Code"
            className="border border-yellow-500 rounded px-3 py-2"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangerHandler}
            type="text"
            placeholder="Country"
            className="border border-yellow-500 rounded px-3 py-2"
          />
        </div>

        {/* Payment Method */}
        <div className="mt-4">
          <Title text1="Payment" text2="Method" />
          <div className="flex flex-wrap gap-4 mt-4">
            {['stripe', 'COD'].map((type) => (
              <div
                key={type}
                onClick={() => setMethod(type)}
                className={`flex items-center gap-3 border px-5 py-3 rounded-md cursor-pointer transition-all duration-200 ${
                  method === type ? 'border-yellow-500 bg-yellow-100 shadow-md' : 'border-gray-300'
                }`}
              >
                <div className="w-4 h-4 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                  {method === type && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                </div>
                {type === 'COD' ? (
                  <p className="text-sm text-yellow-700 font-medium">Cash On Delivery</p>
                ) : (
                  <img className="h-5" src={assets[`${type.toLowerCase()}_logo`]} alt={type} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="w-full text-right mt-6">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md shadow-sm font-medium"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>

    {/* Right: Cart Summary */}
    <div className="w-full sm:max-w-[480px] mt-10 sm:mt-0">
      <CartTotal />
    </div>
  </div>
);
};

export default Placeorder;
