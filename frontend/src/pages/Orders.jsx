import React, { useCallback, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setOrderData]= useState([])
  const loadOrderData =async ()=>{
    try {
      if(!token){
        return null
      }
      const response =await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})

      if(response.data.success){
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] =order.status
            item['payment'] =order.payment
            item['paymentMethod'] =order.paymentMethod
            item['date'] =order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  // Reverse the orders array to display in reverse order
  const reversedOrders = [...orderData].reverse();

  return (
    <div className='border-t pt-16 px-4 sm:px-8'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className='space-y-6'>
        {reversedOrders.map((item, index) => (
          <div
            key={index}
            className='py-6 px-4 bg-white shadow-sm rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-6'
          >
            <div className='flex items-start gap-5 text-sm'>
              <img
                className='w-20 h-20 object-cover rounded-lg border'
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className='sm:text-base font-semibold text-gray-800'>
                  {item.name}
                </p>
                <div className='flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600'>
                  <p className='text-lg font-medium text-gray-900'>
                    {currency}
                    {item.price[item.sizes.indexOf(item.size)]}
                  </p>
                  <p className='border-l pl-3'>Quantity: {item.quantity}</p>
                  <p className='border-l pl-3'>Size: {item.size}</p>
                </div>
                <p className='mt-3 text-sm text-gray-500'>
                  Date:{' '}
                  <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                 <p className='mt-3 text-sm text-gray-500'>Payment: {item.paymentMethod}</p>
              </div>
            </div>
            <div className='w-full md:w-1/2 flex justify-between items-center mt-4 md:mt-0'>
              <div className='flex items-center gap-2'>
                <span className='inline-block w-3 h-3 rounded-full bg-green-500'></span>
                <p className='text-sm md:text-base text-green-600 font-medium'>
                 {item.status}
                </p>
              </div>
              <button onClick={loadOrderData} className='px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
