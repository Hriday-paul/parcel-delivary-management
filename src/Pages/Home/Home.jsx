import { FloatButton, Input } from 'antd';
import Button from '@mui/material/Button';
import { IoSearch } from 'react-icons/io5';
import Carousel from './Carousel';
import WhatWeDo from './WhatWeDo/WhatWeDo';
import { Helmet } from 'react-helmet-async';
import CountDown from './CountDown';
const { Search } = Input;



const Home = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <div className='max-w-7xl mx-auto px-4'>
            <Helmet>
                <title>Delivered</title>
            </Helmet>
            {/* <iframe className='h-[500px] w-80' src="https://lottie.host/embed/8dcb3f40-8ac6-495d-9edc-99f9fd9c4cb3/XTeOouwT9o.json"></iframe> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 items-center min-h-[calc(100vh-72px)]">
                <div className="order-2 md:order-1 text-center md:text-left">
                    <h2 className="text-3xl lg:text-4xl font-bold uppercase text-indigo-950 mb-2">
                        We have faster <span className="text-orange-600">&</span> safety
                    </h2>
                    <h1 className="font-extrabold text-transparent text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-950">DELEVERY</h1>

                    <Search
                        className='w-2/3 mt-5'
                        placeholder="search here ...."
                        allowClear
                        enterButton={<IoSearch className='text-2xl'></IoSearch>}
                        size="large"
                        onSearch={onSearch}
                    />

                </div>
                <div className="order-1 md:order-2 mx-auto">
                    <img className="mt-5 md:mt-10 lg:mt-16" src="https://i.ibb.co/qCHWVBJ/hero-001.png" alt="bg image" />
                </div>

            </div>
            <WhatWeDo></WhatWeDo>

            <div className='mt-10 mb-5 md:mt-14 lg:my-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-5 md:gap-5 items-center justify-center'>
                    <div className='space-y-4 order-2 md:order-1'>
                        <div className='space-y-2'>
                            <h2 className='text-4xl md:text-3xl lg:text-4xl font-bold text-slate-900'>Get Your Products in 30</h2>
                            <h2 className='text-4xl md:text-3xl lg:text-4xl font-bold text-slate-900'>Minutes At Your</h2>
                            <h2 className='text-4xl md:text-3xl lg:text-4xl font-bold text-slate-900'>Door Step</h2>
                        </div>
                        <p className='text-base text-gray-700'>This service best deliverd service for you. Our service safe your product and and receive your product just time. We are providing best delivery service.</p>
                        <Button size='large' variant="contained">Read More</Button>
                    </div>
                    <div className='order-1 md:order-2 mx-auto'>
                        <img className='object-cover h-96' src="https://i.ibb.co/H4BY10W/Pngtree-delivery-man-ride-motorcycle-in-5366465-removebg-preview.png" alt="delevery image" />
                    </div>
                </div>
            </div>

            <CountDown></CountDown>



            <FloatButton.BackTop />
        </div>
    );
};

export default Home;