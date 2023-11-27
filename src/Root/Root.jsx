import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Shared/Navbar/Navbar"
import Footer from "../Pages/Shared/Footer/Footer"

function Root() {

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>

  )
}

export default Root