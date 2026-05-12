import Header from '@/components/Header'
import SaleScreenListSection from '@/features/sale-screen/components/SaleScreenListSection'
import React from 'react'

const page = () => {
  return (
      <div>
      <Header currentPage='sale-screen' />
      <SaleScreenListSection />
    </div>
  )
}

export default page