import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      
      // Update local state immediately for better UX
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      console.log(response.data)
      if (response.data.success) {
        toast.success('Order status updated successfully');
      } else {
        // Revert the local state if API call failed
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: order.status } : order
          )
        );
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // Revert the local state if API call failed
      await fetchAllOrders();
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Order Page</h3>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="border border-gray-200 shadow-sm rounded-lg p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                  className="w-10 h-10"
                />
                <h4 className="text-lg font-semibold text-gray-700">
                  Order #{index + 1}
                </h4>
              </div>

              <div className="mb-4">
                <h5 className="font-medium text-gray-600">Items:</h5>
                <ul className="list-disc list-inside text-gray-700">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} 
                      <span className="text-sm text-gray-500 ml-1">({item.size})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-700">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  📞 {order.address.phone}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Items:</span> {order.items.length}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Method:</span> {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Payment:</span> 
                  <span className={`ml-1 ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
                  <p>{order.status}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-semibold text-gray-800">
                  ₹{order.amount}
                </p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  
                  value={order.status} 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="out for delivery">out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;