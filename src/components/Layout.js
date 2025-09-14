import React from 'react'
import Navbar from "components/Navbar"
import Footer from "components/Footer"
const Layout = ({children}) =>  {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar/>
      <main className='flex-grow-1 container my-4'>{children}</main>
      <Footer/>
    </div>
  )
}
export default Layout