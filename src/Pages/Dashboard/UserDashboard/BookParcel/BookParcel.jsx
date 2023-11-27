import { DatePicker } from "antd";
import DashboardHeader from "../../../Shared/DashboardHeader/DashboardHeader";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useContext, useState } from "react";
import { authContxt } from "../../../../ContextHandler/Authonicate/Authonicate";
dayjs.locale('en');

const dateFormat = 'YYYY/MM/DD';

const BookParcel = () => {
    const {userInfo} = useContext(authContxt);
    const [date, setDate] = useState(dayjs('2023/11/29', dateFormat));
    const [weight, setWeight] = useState(0);

    return (
        <div className="">
            <DashboardHeader title={'Book a Parcel'}></DashboardHeader>
            <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-5 gap-y-5 items-center">
                    <div>
                        <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name <span className="text-red-500">*</span></label>

                        <input id='userName' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="userEmail" className="block mb-2 text-sm font-medium text-gray-900 ">Your Email <span className="text-red-500">*</span></label>

                        <input id='userEmail' type="email" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone <span className="text-red-500">*</span></label>

                        <input id='phone' type="number" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="percelType" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Type <span className="text-red-500">*</span></label>

                        <input id='percelType' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="percelWeight" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Weight <span className="text-red-500">*</span></label>
                        <div className="flex items-center">
                            <input onChange={(e) => e.target.value ? setWeight(parseInt(e.target.value)) : setWeight(0)} id='percelWeight' type="number" className="rounded-md rounded-r-none px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" defaultValue={0}/>

                            <span className="px-5 py-2 bg-slate-100 rounded-r-md border-l border-t-gray-200 border-gray-300  shadow-inner">gram</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="receiverName" className="block mb-2 text-sm font-medium text-gray-900 ">Receivers Name <span className="text-red-500">*</span></label>

                        <input id='receiverName' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="receiverPhone" className="block mb-2 text-sm font-medium text-gray-900 ">Receivers Phone<span className="text-red-500">*</span></label>

                        <input id='receiverPhone' type="number" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="deleveryAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Delivery Address <span className="text-red-500">*</span></label>

                        <input id='deleveryAddress' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" placeholder="village, upzilla, district" />
                    </div>
                    <div>
                        <label htmlFor="deleveryAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Requested Delivery Date <span className="text-red-500">*</span></label>

                        <DatePicker size="large"
                            className="w-full"
                            defaultValue={dayjs('2023/11/29', dateFormat)}
                            format={dateFormat}
                            onChange={(date, dateString) => {
                                setDate(date);
                                console.log(date, dateString)
                            }}
                        />

                    </div>
                    <div>
                        <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Address Latitude <span className="text-red-500">*</span></label>

                        <input id='latitude' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Address Longitude <span className="text-red-500">*</span></label>

                        <input id='longitude' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price <span className="text-red-500">*</span></label>

                        <input value={(weight/1000)<1 ? 50 : ((weight/1000)<2 && (weight/1000)<1) ? 100 : 150 } id='price' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" disabled/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookParcel;