import { DatePicker } from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { Controller, useForm } from "react-hook-form"
import { useContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import UseUpdateBook from "../../../../../Hooks/UseUpdateBook/UseUpdateBook";
import { authContxt } from "../../../../../ContextHandler/Authonicate/Authonicate";
import UseMyparcels from "../../../../../Hooks/UseMyparcels/UseMyparcels";
dayjs.locale('en');

const dateFormat = 'YYYY/MM/DD';

const UpdateParcel = ({parcelInfo}) => {
    const {userInfo} = useContext(authContxt);
    const {refetch} = UseMyparcels(userInfo.email);
    const [date, setDate] = useState(dayjs('2023/11/29', dateFormat));
    const [weight, setWeight] = useState(parcelInfo?.weight);
    const price = useRef(null);
    const { mutate, isPending, isSuccess } = UseUpdateBook();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const parcelData = { ...data, weight, price: parseInt(price.current.value), reqDate : new Date(date?.$y, date?.$M, date?.$D,).getTime(), bookDate: Date.now(), status: parcelInfo?.status, id : parcelInfo?._id, deliveryMan: parcelInfo?.deliveryMan}

        if (weight > 0 && date) {
            mutate(parcelData);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            refetch();
        }

    }, [isSuccess])

    


    return (
        <div className="">
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-5 gap-y-5 items-center">
                        
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone <span className="text-red-500">*</span></label>

                            <Controller
                                name="phone"
                                control={control}
                                defaultValue={`${parcelInfo.phone}`}
                                render={({ field }) => (
                                    <input id='phone'  type="number" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...field} />
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

                            <input defaultValue={parcelInfo?.percelType} id='percelType' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("percelType", { required: true })} />
                            {errors.percelType?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Percel type is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="percelWeight" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Weight <span className="text-red-500">*</span></label>
                            <div className="flex items-center">

                                <input defaultValue={parcelInfo?.weight} onChange={(e) => e.target.value ? setWeight(parseInt(e.target.value)) : setWeight(0)} id='percelWeight' type="number" className="rounded-md rounded-r-none px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" required />

                                <span className="px-5 py-2 bg-slate-100 rounded-r-md border-l border-t-gray-200 border-gray-300  shadow-inner">gram</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="receiverName" className="block mb-2 text-sm font-medium text-gray-900 ">Receivers Name <span className="text-red-500">*</span></label>

                            <input defaultValue={parcelInfo?.receiverName} id='receiverName' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("receiverName", { required: true })} />
                            {errors.receiverName?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Receiver name is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="receiverPhone" className="block mb-2 text-sm font-medium text-gray-900 ">Receivers Phone<span className="text-red-500">*</span></label>

                            <input defaultValue={parcelInfo?.receiverPhone} id='receiverPhone' type="number" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("receiverPhone", { required: true, minLength: 11 })} />

                            {errors.receiverPhone?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Phone number is required</p>
                            )}
                            {errors.receiverPhone?.type === "minLength" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Enter valid phone number</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="deleveryAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Parcel Delivery Address <span className="text-red-500">*</span></label>

                            <input defaultValue={parcelInfo?.deleveryAddress} id='deleveryAddress' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" placeholder="village, upzilla, district" {...register("deleveryAddress", { required: true })} />

                            {errors.deleveryAddress?.type === "required" && (
                                <p className="text-sm text-red-500 mt-2" role="alert">Delevery address is required</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="deleveryAddress" className="block mb-2 text-sm font-medium text-gray-900 ">Requested Delivery Date <span className="text-red-500">*</span></label>

                            <DatePicker size="large"
                                className="w-full"
                                defaultValue={dayjs(`${(new Date(parcelInfo?.reqDate).getFullYear())+'/'+(new Date(parcelInfo?.reqDate).getMonth()+1)+'/'+(new Date(parcelInfo?.reqDate).getDate())}`, dateFormat)}
                                format={dateFormat}
                                onChange={(date) => {
                                    setDate(date);
                                }}
                            />

                        </div>
                        <div>
                            <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Address Latitude</label>

                            <input defaultValue={parcelInfo?.latitude} id='latitude' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("latitude")} />


                        </div>
                        <div>
                            <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900 ">Delivery Address Longitude</label>

                            <input defaultValue={parcelInfo?.longitude} id='longitude' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" {...register("longitude")} />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price <span className="text-red-500">*</span></label>

                            <input id='price' type="text" className="rounded-md px-2 border-x-0 focus:border-0 border-b-0 border-t-gray-200 outline-none py-1 bg-slate-100 shadow-inner h-10 w-full text-sm" disabled={true} ref={price}
                                value={(weight / 1000) <= 1 ? 50 : ((weight / 1000) <= 2 && (weight / 1000) > 1) ? 100 : 150}
                            />


                        </div>
                        <div className="col-span-1 md:col-span-2 my-2">
                            <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                                Update Now
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

export default UpdateParcel;