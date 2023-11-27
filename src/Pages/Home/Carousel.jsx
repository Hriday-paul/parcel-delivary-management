import { Navigation, Pagination, Scrollbar, A11y, EffectCreative, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { GrFormNextLink } from "react-icons/gr";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Link } from 'react-router-dom';

function Carousel() {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            }}
            className="mySwiper my-10"
        >
            <div className="swiper-button-next">
                <GrFormNextLink className='text-red-600' />
            </div>
            <div className="swiper-button-prev">
                <BiLeftArrowAlt  />
            </div>
            <SwiperSlide>
                <div className="hero h-56 mt-4 lg:mt-0 md:h-80 lg:h-[448px] w-full object-cover" style={{ backgroundImage: 'url(https://www.chefspencil.com/wp-content/uploads/Screenshot-2021-05-24-at-19.15.48.jpg.webp)' }}>
                    <div className="hero-overlay bg-opacity-50"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-3xl md:text-5xl font-bold">Chicken Grill</h1>
                            <span className="mb-5 text-xl md:text-2xl">This food is Awosome fast food. <p className='text-3xl font-bold md:text-5xl'>30% OFF</p></span>
                            <Link to="/category/grilChicken" className="btn btn-sm md:btn-md bg-orange-600 hover:bg-orange-600 duration-200 border-0 outline-0 mt-3 text-white group">Buy Now<BiRightArrowAlt className="text-xl group-hover:ml-1 duration-200"></BiRightArrowAlt></Link>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="hero h-56 mt-4 lg:mt-0 md:h-80 lg:h-[448px] w-full object-cover" style={{ backgroundImage: 'url(https://freepngimg.com/thumb/grocery/56420-4-seekh-kabab-download-download-hq-png.png)' }}>
                    <div className="hero-overlay bg-opacity-50"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Sheek Kabab</h1>
                            <span className="mb-5 text-2xl">This food is Awosome fast food. <p className='text-5xl font-bold'>20% OFF</p></span>
                            <Link to="/category/sheekKabab" className="btn bg-orange-600 hover:bg-orange-600 duration-200 border-0 outline-0 mt-3 text-white group">Buy Now<BiRightArrowAlt className="text-xl group-hover:ml-1 duration-200"></BiRightArrowAlt></Link>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="hero h-56 mt-4 lg:mt-0 md:h-80 lg:h-[448px] w-full object-cover" style={{ backgroundImage: 'url(https://www.bengalsaroma.com/wp-content/uploads/2019/02/%E0%A6%95%E0%A6%BE%E0%A6%9A%E0%A7%8D%E0%A6%9A%E0%A6%BF-%E0%A6%AC%E0%A6%BF%E0%A6%B0%E0%A6%BF%E0%A7%9F%E0%A6%BE%E0%A6%A8%E0%A6%BF.png)' }}>
                    <div className="hero-overlay bg-opacity-40"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Kacchi Biryani</h1>
                            <span className="mb-5 text-2xl">This food is Awosome fast food. <p className='text-5xl font-bold'>10% OFF</p></span>
                            <Link to="/category/kacchi" className="btn bg-orange-600 hover:bg-orange-600 duration-200 border-0 outline-0 mt-3 text-white group">Buy Now<BiRightArrowAlt className="text-xl group-hover:ml-1 duration-200"></BiRightArrowAlt></Link>
                        </div>
                    </div>
                </div>

            </SwiperSlide>

        </Swiper>
    )
}

export default Carousel
