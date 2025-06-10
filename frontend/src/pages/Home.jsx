import React from 'react'
import { Hero } from '../components/Hero'
import LatestCollection from '../components/LatestCollections';
import Bestsellers from '../components/Bestsellers';
import Policy from '../components/Policy';
import News from '../components/News';
const Home = () => {
  return (
    <div>
    <Hero/>
   <LatestCollection/>
   <Bestsellers/>
   <Policy></Policy>
   <News/>
    </div>
  )
}

export default Home