import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import UseAxios from '../../Hooks/UseAxios/UseAxios';

const CountDown = () => {
    const [datas, setDatas] = useState({});
    const axiosPublic = UseAxios();
    useEffect(() => {
        axiosPublic.get('homePage')
            .then(({ data }) => {
                setDatas(data)
            })
    },[])

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 mt-12 mb-5  md:mb-20 text-center flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl uppercase font-bold text-center text-indigo-950 my-10 lg:my-16  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-950">We Are Growing</h2>

                <div>
                    <div className='flex flex-row flex-wrap justify-center items-center'>
                        <div className='border count flex space-y-3 flex-col items-center justify-center rounded-3xl md:rounded-r-none md:border-r-0 border-b-0 rounded-b-none md:border-b md:rounded-bl-3xl w-64 md:w-44 lg:w-64 h-40'>
                            
                            {
                                datas ? <CountUp delay={1} duration={8} end={datas?.parcelRunnigLen}  enableScrollSpy={true} scrollSpyOnce={true} redraw={true}/> : 'Loading...'
                            }
                            <h3 className='text-2xl font-serif md:text-xl lg:text-2xl font-medium text-slate-800'>Percel Booked</h3>
                        </div>
                        <div className='border count flex space-y-3 flex-col items-center justify-center w-64 md:w-44 lg:w-64 h-40'>
                            {
                                datas ? <CountUp delay={1} duration={6} end={datas?.bookedLen} enableScrollSpy={true} scrollSpyOnce={true} redraw={true}/> : 'Loading...'
                            }
                            <h3 className='text-2xl text-slate-800 font-serif md:text-xl lg:text-2xl font-medium '>Percel Delivered</h3>
                        </div>
                        <div className='border count flex space-y-3 flex-col items-center justify-center rounded-3xl md:rounded-l-none md:border-l-0 border-t-0 rounded-t-none md:border-t md:rounded-tr-3xl w-64 md:w-44 lg:w-64 h-40'>
                            
                            {
                                datas ? <CountUp delay={1} duration={6} end={datas?.userLen} enableScrollSpy={true} scrollSpyOnce={true} redraw={true} /> : 'Loading...'
                            }
                            <h3 className='text-2xl font-serif md:text-xl lg:text-2xl font-medium text-slate-800'>Users</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountDown;