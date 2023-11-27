import { useContext } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiSignOutFill } from "react-icons/pi";
import { SiGnuprivacyguard } from "react-icons/si";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';
import { authContxt } from '../../../ContextHandler/Authonicate/Authonicate';



const Navbar = () => {
    // const [sideOpen, seSideOpen] = useState(false);
    const { logOutUser, userInfo } = useContext(authContxt);
   
    return (
        <div className='sticky top-0 bg-white z-50'>
            <div className='flex justify-between items-center py-3 lg:py-2'>
                <div className='flex flex-row items-center'>
                    <img className='h-12 lg:h-14' src="https://i.ibb.co/gj0mB4d/logo-removebg-preview.png" alt="logo" />
                    <h2 className='text-xl md:text-2xl font-bold text-blue-950 font-mono uppercase'>Deliverd</h2>
                </div>
                <div>
                    <ul className='hidden md:flex gap-x-6 lg:gap-x-10 items-center justify-center'>
                        <li className='text-base font-medium text-indigo-950 font-sans uppercase hover:underline hover:underline-offset-4 decoration-2 decoration-dashed'><NavLink to="/">Home</NavLink></li>
                        <li className='text-base font-medium text-indigo-950 font-sans uppercase'><NavLink to="/dashboard">Dashboard</NavLink></li>

                        <li><Badge badgeContent={4} color='info'>
                            <IoIosNotifications className='text-2xl'></IoIosNotifications>
                        </Badge></li>
                    </ul>
                </div>
                <div className='flex gap-x-3 lg:gap-x-5 items-center'>
                    {userInfo ? <div className=' border border-gray-200 rounded-full cursor-pointer flex items-center group relative'>
                        <img className="h-7 m-[3px] rounded-full" src={userInfo?.photoURL != null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        
                        <RiArrowDropDownLine className='text-2xl -rotate-90  group-hover:-rotate-0 duration-200'></RiArrowDropDownLine>

                        <div className="z-40 h-0 w-56 group-hover:h-auto group-hover:p-4 overflow-hidden absolute top-0 right-0 my-4 text-base mt-9 list-none bg-white divide-y divide-gray-100 rounded-lg shadow">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{userInfo?.displayName}</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userInfo?.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link to="/" className="flex items-center gap-x-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "><LuLayoutDashboard></LuLayoutDashboard>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/" className="flex items-center gap-x-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><CgProfile></CgProfile>Profile</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="flex items-center gap-x-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><PiSignOutFill></PiSignOutFill>Register</Link>
                                </li>
                                <hr />
                                <li>
                                    <div onClick={logOutUser} className="px-4 mt-2 flex items-center gap-x-1 py-2 text-sm text-gray-700 hover:bg-gray-100"><SiGnuprivacyguard className='text-red-500'></SiGnuprivacyguard>Sign out</div>
                                </li>
                            </ul>
                        </div>
                    </div> : <Link to='/login'><Button variant="contained">Login</Button></Link>}
                    
                    <IoSearch className='text-2xl hidden md:block'></IoSearch>
                </div>
            </div>
        </div>
    );
};

export default Navbar;