import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export const ShopContext = createContext();




const ShopContextProvider =(Props)=>{

        const currency ='₹';
        const delivery_fee=10;

        const backendUrl  = import.meta.env.VITE_BACKEND_URL
        console.log(backendUrl)
        const [search,setsearch]=useState('');
        const[showsearch,setshowsearch]=useState(false);
        const [cartItems,setCartItems]= useState({});
        const [products,setProducts] =useState([]);
        const [token,setToken] =useState('')
        const navigate= useNavigate();

        const addToCart = async (itemId,size)=>{
            let cartData= structuredClone(cartItems);
            if(cartData[itemId]){
                if(cartData[itemId][size]){
                    cartData[itemId][size] +=1;
                }
                else{
                    cartData[itemId][size]=1;
                }
            }
            else{
                cartData[itemId]={};
                cartData[itemId][size]=1;
            }
            setCartItems(cartData);
            if(token){
              try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
              } catch (error) {
                console.log(error)
                toast.error(error.message)
              }
            }
        }

      const getCartCount=()=>{
        let totalCount=0;
        for (const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount +=cartItems[items][item];
                    }
                }
                catch(error){
                  console.log(error)
                  toast.error(error.message)
                }
            }
        }
        return totalCount;
      }

      const updateQuantity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size]= quantity;
        setCartItems(cartData);

        if(token){
          try {
            await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
         
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        }
      }

 const getCartAmount = () => {
  let totalAmount = 0;

  for (const productId in cartItems) {
    const itemInfo = products.find(product => product._id === productId);
    if (!itemInfo) continue;

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];

      if (quantity > 0) {
        try {
          const sizeIndex = itemInfo.sizes.indexOf(size);
          const unitPrice = sizeIndex !== -1 ? itemInfo.price[sizeIndex] : 0;
          totalAmount += unitPrice * quantity;
        } catch (error) {
          console.error("Error calculating price:", error);
        }
      }
    }
  }

  return totalAmount;
};
 



 useEffect(() => {
  const getProductsData = async () => {
    try {
      console.log("Calling:", `${backendUrl}/api/product/list`);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.message);
      }
      else{
        console.error("Something went wrong")
      }
    } catch (error) {
      console.error("API call failed:", error);
      toast.error(error.message)
    }
  };

  getProductsData();
}, []);

const getUserCart =async(token) =>{
  try {
   // console.log(token)
    const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
   
    if(response.data.suuccess){
        
      setCartItems(response.data.cartData)
    }
  } catch (error) {
    console.error("API call failed:", error);
      toast.error(error.message)
  }
}


// 1️⃣ First effect: Check localStorage and set token
useEffect(() => {
  const savedToken = localStorage.getItem('token');
  if (savedToken && !token) {
    setToken(savedToken);
  }
}, []);

// 2️⃣ Second effect: When token is set, fetch cart
useEffect(() => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    setToken(savedToken);
    getUserCart(savedToken);  // ✅ fetch cart directly
  }
}, []);




        const value={
            products,currency,delivery_fee,
            search,setsearch,showsearch,setshowsearch,
            cartItems,addToCart,
            getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,setToken,token,setCartItems
        }
        return(
            <ShopContext.Provider value={value}>
                {Props.children}
            </ShopContext.Provider>
        )
        
}

export default ShopContextProvider