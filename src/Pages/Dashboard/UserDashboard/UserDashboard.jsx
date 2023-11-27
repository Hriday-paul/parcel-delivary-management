import { PiSignInDuotone } from 'react-icons/pi';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AiOutlineMenuFold } from "react-icons/ai";
import { FiUserPlus } from 'react-icons/fi';
import { MdLibraryBooks } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaListAlt, FaUserTie } from "react-icons/fa";
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Divide as Hamburger } from 'hamburger-react'
import { useContext, useState } from 'react';
import { authContxt } from '../../../ContextHandler/Authonicate/Authonicate'


const UserDashboard = () => {
    const { userInfo, logOutUser } = useContext(authContxt);
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    return (
        <div>
            <div className='flex'>
                <Sidebar collapsed={collapsed} onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint='lg' backgroundColor='#253031' className='h-screen text-white relative'>
                    <Menu
                        menuItemStyles={{
                            button: {
                                [`&.active`]: {
                                    backgroundColor: '#0B0D0D',
                                    color: '#fff',
                                },
                                ':hover': {
                                    backgroundColor: '#0B0D0D',
                                    transition: '0.2s'
                                },
                            },
                        }}
                    >
                        <div className='border-b border-gray-500'>
                            <Link className='flex justify-center items-center' to="/dashboard">
                                <div className='flex flex-row items-center'>
                                    <img className='h-12 lg:h-14' src="https://i.ibb.co/gj0mB4d/logo-removebg-preview.png" alt="logo" />
                                    {
                                        !collapsed && <h2 className='font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-200 to-orange-500'>Deliverd</h2>
                                    }
                                </div>

                            </Link>
                            <div className='flex h-40 flex-col justify-center items-center gap-y-3'>

                                <img className={collapsed ? 'h-10 m-[3px] rounded-full' : 'h-24 m-[3px] rounded-full'} src={userInfo?.photoURL != null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />

                                <h4 className={!collapsed ? 'font-medium text-lg' : 'font-normal text-sm'}>{userInfo?.displayName}</h4>
                            </div>
                        </div>

                        <MenuItem icon={<LuLayoutDashboard className='text-xl'></LuLayoutDashboard>} component={<Link className='font-medium uppercase' to="/" />}>
                            Dashboard
                        </MenuItem>
                        <MenuItem icon={<MdLibraryBooks className='text-xl'></MdLibraryBooks>} component={<Link className=' font-medium uppercase' to="/dashboard/parcel" />}>Book a Parcel</MenuItem>
                        <MenuItem icon={<FaListAlt className='text-xl'></FaListAlt>} component={<Link className='font-medium uppercase' to="/calendar" />}>My Parcels</MenuItem>
                        <MenuItem icon={<FaUserTie className='text-xl'></FaUserTie>} component={<Link className='font-medium uppercase' to="/e-commerce" />}>My Profile</MenuItem>


                        <div className='border-t border-gray-500'>
                            <SubMenu icon={<IoMdSettings className='text-xl'></IoMdSettings>} label="Settings" className='font-medium' subMenuStyles={{ padding: '20px' }}>
                                <MenuItem icon={<FiUserPlus className='text-lg'></FiUserPlus>} component={<Link className='bg-[#253031]' to="/documentation" />}>Sign In</MenuItem>
                                <MenuItem className='bg-[#253031] hover:bg-[#0B0D0D]' onClick={logOutUser} icon={<PiSignInDuotone className='text-lg'></PiSignInDuotone>} >Sign Out</MenuItem>
                            </SubMenu>
                        </div>

                        <div className='flex flex-col justify-center items-center bg-[#253031] text-white p-2 absolute bottom-2 w-full border-t border-gray-500'>
                            <p className='text-center text-xs'>@DeliverAuth 2023</p>
                            <p className='text-center text-xs'>DeliverAuth version 1.20.1</p>
                        </div>
                    </Menu>
                </Sidebar>


                <main className='w-full'>

                    <div className='flex flex-row items-center border-gray-300 border-b'>
                        {/* // large screen collapse */}
                        <button className='px-5 hidden  lg:block border-r border-gray-300'>
                            <Hamburger toggled={collapsed} toggle={setCollapsed} size={23}></Hamburger>
                        </button>

                        {/* //small screen collapse */}
                        <button onClick={() => setToggled(!toggled)} className='px-5 lg:hidden py-3 border-r border-gray-300'>
                            <AiOutlineMenuFold className='text-2xl'></AiOutlineMenuFold>
                        </button>

                        <div className='mx-auto'>
                            <h1 className='font-medium text-transparent text-xl bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-950'>Delivered</h1>
                        </div>
                        <Link to='/dashboard' className='flex flex-row gap-x-1 items-center px-4 py-3 bg-black text-white'>
                            <FaRegCircleQuestion className='text-lg'></FaRegCircleQuestion>
                            <p>Help</p>
                        </Link>
                        <button onClick={logOutUser} className='flex flex-row gap-x-1 items-center p-2'>
                            <PiSignInDuotone className='text-lg'></PiSignInDuotone>
                            <p className='font-medium'>LogOut</p>
                        </button>
                    </div>

                    <div className='h-[calc(100vh-49px)] bg-slate-200 overflow-y-scroll'>
                        <Outlet></Outlet>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default UserDashboard;