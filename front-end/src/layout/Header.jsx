import React from 'react'
import CheckOutNavbar from '../components/CheckOutNavbar'
import NavbarAnnonce from '../components/NavbarAnnonce'
import NavbarDefault from '../components/NavbarDefault'

const Header = ({isHidden}) => {
  let navbarContent
  if (isHidden){
    navbarContent=<CheckOutNavbar/>
  } else {
    navbarContent=<NavbarDefault/>
  }
  return (
    <>
      <NavbarAnnonce />
      {navbarContent}
    </>
  )
}

export default Header
