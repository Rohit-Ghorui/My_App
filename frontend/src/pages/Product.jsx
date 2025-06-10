import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);

  const [productdata, setProductdata] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);

  const fetchProductData = async () => {
    const item = products.find((item) => item._id === productId);

    if (item) {
      setProductdata(item);
      setImage(item.image[0]);
      setSelectedSize(item.sizes[0]);
      setCurrentPrice(item.price[0]);
    } else {
      try {
        const response = await axios.post(`${backendUrl}/api/product/single`, { productId });
        if (response.data.success) {
          const fetched = response.data.message;
          setProductdata(fetched);
          setImage(fetched.image[0]);
          setSelectedSize(fetched.sizes[0]);
          setCurrentPrice(fetched.price[0]);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleSizeChange = (size, index) => {
    setSelectedSize(size);
    setCurrentPrice(productdata.price[index]);
  };

  if (!productdata) {
    return <div className="text-center py-20 text-gray-500">Loading product...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='' />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_icon} alt='' className='w-3.5' />
            <img src={assets.star_dull_icon} alt='' className='w-3.5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{currentPrice}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productdata.sizes.map((item, index) => (
                <button
                  className={`border py-2 px-4 ${selectedSize === item ? 'bg-black text-white' : 'bg-gray-100'}`}
                  key={index}
                  onClick={() => handleSizeChange(item, index)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productdata._id, selectedSize)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery available</p>
            <p>Easy Return and Exchange</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Dummy Text..................................................</p>
          <p>Dummy Text 2....................................................</p>
        </div>
      </div>

      <RelatedProduct category={productdata.category} subCategory={productdata.subCategory} />
    </div>
  );
};

export default Product;
