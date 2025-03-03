import Header from "../Components/Header"
import Footer from "../Components/Footer"
import {Outlet} from "react-router-dom"
// import HotDeals from "../Components/HotDeals"


function First() {
  return (
    <>
    <Header />
    <Outlet />
    {/* <HotDeals/> */}
    <Footer />
    </>
  )
}

export default First