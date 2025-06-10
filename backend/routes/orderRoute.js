import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/orderController.js'

const orderRouter= express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser,PlaceOrder)
orderRouter.post('/stripe',authUser,PlaceOrderStripe)
orderRouter.post('/razorpay',authUser,PlaceOrderRazorpay)

orderRouter.post('/userorders',authUser,userOrders)

//verify

orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter
