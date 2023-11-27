import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { MdOutlineSafetyCheck } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";

const WhatWeDo = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-14 mb-5 md:mt-20 text-center flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl uppercase font-bold text-center text-indigo-950 my-10 lg:my-16 text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-950">What We Do ?</h2>
            <div className="flex flex-wrap mx-auto flex-col md:flex-row justify-center gap-x-0 gap-y-5 md:gap-5 lg:gap-10">
                <div className="text-center p-8 shadow-xl rounded-md w-80 md:w-72 ">
                    <div className="p-5 bg-[#76CEFE] inline-block rounded-md">
                        <FaMagnifyingGlassLocation className="text-white text-5xl"></FaMagnifyingGlassLocation>
                    </div>
                    <h3 className="text-3xl font-bold flex-grow text-center text-slate-900 my-5">
                        Find Location
                    </h3>
                    <p className="text-lg text-slate-900">
                        We are providing best parcel delivary with your location.
                    </p>
                </div>
                <div className="text-center p-8 shadow-xl rounded-md w-80 md:w-72 ">
                    <div className="p-5 bg-[#FFA640] inline-block rounded-md">
                        <MdOutlineSafetyCheck className="text-white text-5xl"></MdOutlineSafetyCheck>
                    </div>
                    <h3 className="text-3xl font-bold text-center text-slate-900 my-5">
                        Safety & Just Time
                    </h3>
                    <p className="text-lg text-slate-900">
                        We Send delivered product just time and carefully.
                    </p>
                </div>
                <div className="text-center p-8 shadow-xl rounded-md w-80 md:w-72 ">
                    <div className="p-5 bg-[#FF507E] inline-block rounded-md">
                        <CiTrophy className="text-white text-5xl"></CiTrophy>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-slate-900 my-5">
                        Lighting Fist Delivary
                    </h3>
                    <p className="text-lg text-slate-900">
                        We are providing first delivared your product.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhatWeDo;