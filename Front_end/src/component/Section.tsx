import React from 'react'
import { Outlet } from 'react-router-dom';
import { CartProvider, SearchProvider } from '../lib';

const Section = () => {

  return (
    <CartProvider>
      <SearchProvider>
        <Outlet />
      </SearchProvider>
    </CartProvider>
  )
}

export default Section