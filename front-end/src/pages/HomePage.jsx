import React from 'react'
import Banner from '../modules/Banner'
import BannerCollection from '../modules/BannerCollection'
import BestSellersList from '../modules/BestSellersList'
import CategoryList from '../modules/CategoryList'
import HighlightList from '../modules/HighlightList'
import OurBrand from '../modules/OurBrand'
import ProductList from '../modules/ProductList'

function HomePage() {
  return (
   <>
      <Banner />
      <ProductList />
      <CategoryList />
      <HighlightList />
      <BannerCollection />
      <BestSellersList/>
      <OurBrand/>
   </>
  )
}

export default HomePage
