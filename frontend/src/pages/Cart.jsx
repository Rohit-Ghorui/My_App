import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Wait for products and cartItems to be available
    if (products.length === 0 || Object.keys(cartItems).length === 0) return;

    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-10 min-h-screen">
      <div className="text-2xl mb-6">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          🛒 Your cart is currently empty.
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null; // Defensive check

              const sizeIndex = productData.sizes?.indexOf(item.size) ?? -1;
              const price = sizeIndex !== -1 ? productData.price[sizeIndex] : 0;

              return (
                <div
                  key={index}
                  className="py-4 px-3 border rounded-lg shadow-sm bg-white grid grid-cols-[4fr_1fr_1fr_0.5fr] sm:grid-cols-[4fr_1fr_1fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <img
                      className="w-16 sm:w-20 rounded shadow"
                      src={productData.image?.[0] || assets.placeholder_image}
                      alt={productData.name || 'Product'}
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-semibold">{productData.name || 'Product Name'}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm sm:text-base">
                        <p className="text-gray-700">
                          {currency}
                          {price}
                        </p>
                        <span className="px-2 py-1 border bg-yellow-500 text-xs rounded">{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) updateQuantity(item._id, item.size, val);
                    }}
                    className="border rounded px-2 py-1 w-14 sm:w-20 text-center focus:outline-none focus:ring focus:ring-blue-300"
                  />

                  <p className="text-sm font-medium text-gray-800">
                    {currency}
                    {(price * item.quantity).toFixed(2)}
                  </p>

                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform"
                    src={assets.bin_icon}
                    alt="Delete"
                    title="Remove from cart"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate('/placeorder')}
                  className="bg-yellow-500 text-sm my-8 px-8 py-3 rounded"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
