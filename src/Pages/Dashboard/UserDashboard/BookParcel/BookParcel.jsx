import { DatePicker } from "antd";
import DashboardHeader from "../../../Shared/DashboardHeader/DashboardHeader";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { Controller, useForm } from "react-hook-form"
import { useContext, useEffect, useRef, useState } from "react";
import { authContxt } from "../../../../ContextHandler/Authonicate/Authonicate";
import UseAddBook from "../../../../Hooks/UseAddBook/UseAddBook";
import { Toaster } from "react-hot-toast";
dayjs.locale('en');

const dateFormat = 'YYYY/MM/DD';

const BookParcel = () => {
    const { userInfo } = useContext(authContxt);
    const [date, setDate] = useState(dayjs('2023/11/29', dateFormat));
    const [weight, setWeight] = useState(0);
    const price = useRef(null);
    const { mutate, isPending, isSuccess } = UseAddBook();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const parcelInfo = { ...data, weight, price: parseInt(price.current.value), reqDate : new Date(date?.$y, date?.$M, date?.$D,).getTime(), bookDate: new Date(), payment : false, status : 'pending' }


        if(parseInt(weight)>0 && date){
            mutate(parcelInfo);
        }
        
    }

    useEffect(()=>{
        if(isSuccess){
            reset();
            setWeight(0)
        }
        
    }, [isSuccess, reset])



    return (
        <div className="">
            <DashboardHeader title={'Book a Parcel'}></DashboardHeader>

            <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-5 gap-y-5 items-center">
                        <div>
                            <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name<span className="text-red-500">*</span></label>

                            <Controller
                                name="userName"
                                control={control}
                                defaultValue={userInfo.displayName}
                                render={({ field }) => (
                                    <input id='userName' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...field} disabled={true} />
                                )}
                            />


                        </div>
                        <div>
                            <label htmlFor="userEmail" className="block mb-2 text-sm font-medium text-gray-900 ">Your Email <span className="text-red-500">*</span></label>

                            <Controller
                                name="userEmail"
                                control={control}
                                defaultValue={userInfo.email}
                                render={({ field }) => (
                                    <input id='userEmail' type="email" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...field} disabled={true} />
                                )}
                            />

                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone <span className="text-red-500">*</span></label>

                            <Controller
                                name="phone"
                                control={control}
                                defaultValue={userInfo?.phone}
                                render={({ field }) => (
                                    <input id='phone' type="number" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...field} />
                                )}
                                rules={{ required: true, minLength: 11 }}
                            />
                            {errors.phone?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Phone number is required</p>
                            )}
                            {errors.phone?.type === "minLength" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Enter valid phone number</p>
                            )}


                        </div>
                        <div>
                            <label htmlFor="percelType" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Type <span className="text-red-500">*</span></label>

                            <input id='percelType' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("percelType", { required: true })} />
                            {errors.percelType?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Percel type is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="percelWeight" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Weight <span className="text-red-500">*</span></label>
                            <div className="flex items-center">

                                <input onChange={(e) => e.target.value ? setWeight(parseInt(e.target.value)) : setWeight(0)} id='percelWeight' type="number" className="rounded-md rounded-r-none px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" value={weight} required/>

                                <span className="px-5 py-2 bg-slate-100 rounded-r-md border-l border-t-gray-200 border-gray-300  shadow-inner">gram</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="receiverName" className="block mb-2 text-sm font-medium text-gray-900 ">Receivers Name <span className="text-red-500">*</span></label>

                            <input id='receiverName' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("receiverName", { required: true })} />
                            {errors.receiverName?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Receiver name is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="receiverPhone" className="block mb-2 text-sm font-medium text-gray-900 ">Receivers Phone<span className="text-red-500">*</span></label>

                            <input id='receiverPhone' type="number" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("receiverPhone", { required: true, minLength: 11 })} />

                            {errors.receiverPhone?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Phone number is required</p>
                            )}
                            {errors.receiverPhone?.type === "minLength" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Enter valid phone number</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="deleveryAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Delivery Address <span className="text-red-500">*</span></label>

                            <input id='deleveryAddress' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" placeholder="village, upzilla, district" {...register("deleveryAddress", { required: true })} />

                            {errors.deleveryAddress?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Delevery address is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="deleveryAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Requested Delivery Date <span className="text-red-500">*</span></label>

                            <DatePicker size="large"
                                className="w-full"
                                defaultValue={dayjs('2023/11/29', dateFormat)}
                                format={dateFormat}
                                onChange={(date) => {
                                    setDate(date);
                                }}
                            />

                        </div>
                        <div>
                            <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Address Latitude</label>

                            <input id='latitude' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("latitude")} />


                        </div>
                        <div>
                            <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Address Longitude</label>

                            <input id='longitude' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("longitude")} />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price <span className="text-red-500">*</span></label>

                            <input id='price' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" disabled={true} ref={price}
                                value={(weight / 1000) <= 1 ? 50 : ((weight / 1000) <= 2 && (weight / 1000) > 1) ? 100 : 150}
                            />


                        </div>
                        <div className="col-span-1 md:col-span-2 my-2">
                            <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                                Book Now
                                {
                                    isPending && <span className="loading loading-spinner"></span>
                                }
                            </button>
                        </div>
                    </div>
                </form>
                <Toaster></Toaster>
            </div>
        </div>
    );
};

export default BookParcel;