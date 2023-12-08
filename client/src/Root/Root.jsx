import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Shared/Navbar/Navbar"
import Footer from "../Pages/Shared/Footer/Footer"

function Root() {

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto px-4">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>

  )
}

export default Root