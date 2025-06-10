import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Product from '../pages/Product';
import Title from './Title';
import Productitem from './productitem';

const Bestsellers = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter(item => item.bestseller === true);
        setBestSeller(bestProducts);  // Remove slice to include all bestsellers
    }, [products]);
    
  return (
    <div className='my-10'>
         <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p  className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>The Supplements Everyone’s Talking About</p>
        </div>
        {/*product*/}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {
                bestSeller.map((item,index)=>(
                    <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price[0]}></Productitem>
                    )
                )
            }
        </div>
    </div>
  )
}

export default Bestsellers