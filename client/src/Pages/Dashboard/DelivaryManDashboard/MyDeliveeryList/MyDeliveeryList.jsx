import { useContext, useEffect, useState } from "react";
import { authContxt } from "../../../../ContextHandler/Authonicate/Authonicate";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { Button, Empty, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { TiTick } from "react-icons/ti";
import { IoReturnDownBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { MdDirectionsRun } from "react-icons/md";
import { DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import UseUpdateBook from "../../../../Hooks/UseUpdateBook/UseUpdateBook";

const MyDeliveeryList = () => {
    const { userInfo } = useContext(authContxt);
    const [runningOrders, setRunningOrders] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const axiosSecure = UseAxiosSecure();
    const { mutate, isSuccess:updateParcels } = UseUpdateBook();

    console.log(runningOrders)

    const fetchData = () => {
        axiosSecure.get(`/deliveryManInfo/${userInfo.email}`)
            .then(({ data }) => {
                axiosSecure.get(`/runningDeliveryDatas/${userInfo.email}?id=${data._id}`)
                    .then(({ data }) => {
                        setLoading(false)
                        setRunningOrders(data)
                    })
            })
    }

    useEffect(() => {
        fetchData();
    }, [])


    const handleDelete = (id) => {
        Swal.fire({
            text: "Are you sure want to delete this Booked Parcel !",
            icon: `warning`,
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            showCloseButton: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/deleteBook?id=${id}`)
                        .then(({ data }) => {
                            if (data.deletedCount > 0) {
                                fetchData();
                                toast.success("This parcel DELETE successfully")
                            }
                            else {
                                toast.error("Delete Failed")
                            }
                        })
                }

            })
    }

    const handleDelivered = (id)=>{
        mutate({ id: id, status : 'delivered' })
    }

    return (
        <div>
            <div className="p-5 md:p-7 bg-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">My Delivery List</h3>
            </div>
            {
                isLoading ? <div className="min-h-[60vh] bg-white flex justify-center items-center"><Spin indicator={
                    <LoadingOutlined style={{ fontSize: 30, }} spin />} /></div> :

                    <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                        {
                            runningOrders ? <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-sm border-b border-b-gray-200">
                                        <th></th>

                                        <th className="font-medium text-gray-600">Receiver Name</th>
                                        <th className="font-medium text-gray-600 py-5">Receiver Phone</th>
                                        <th className="font-medium text-gray-600">Requested Date</th>
                                        <th className="font-medium text-gray-600">Booking Date</th>
                                        <th className="font-medium text-gray-600">Receiiver Address</th>
                                        {/* <th className="font-medium text-gray-600">View Location</th> */}
                                        <th className="font-medium text-gray-600">Status</th>
                                        <th className="font-medium text-gray-600">Cencel</th>
                                        <th className="font-medium text-gray-600">Delivered</th>
                                    </thead>
                                    <tbody>
                                        {
                                            runningOrders && runningOrders.map((parcel, indx) => {
                                                return <tr key={parcel._id} className="border-b border-b-gray-200 py-10">
                                                    <td className="text-center font-medium">{indx + 1}</td>

                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {parcel?.receiverName}
                                                    </td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {parcel?.receiverPhone}
                                                    </td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {(new Date(parcel?.reqDate).getDate()) + '/' + (new Date(parcel?.reqDate).getMonth() + 1) + '/' + (new Date(parcel?.reqDate).getFullYear())}
                                                    </td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {(new Date(parcel?.bookDate)).getDate() + '/' + ((new Date(parcel?.bookDate)).getMonth() + 1) + '/' + (new Date(parcel?.bookDate)).getFullYear()}
                                                    </td>

                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {parcel?.deleveryAddress}
                                                    </td>
                                                    {/* <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {'loc'}
                                                    </td> */}
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {parcel.status === 'pending' && <Spin indicator={
                                                            <LoadingOutlined style={{ color: '#4096FF', fontSize: 14, }} spin />} />}

                                                        {parcel.status === 'onWay' && <MdDirectionsRun className="text-lg mx-auto"></MdDirectionsRun>}
                                                        {parcel.status === 'delivered' && <TiTick className="text-green-500 text-lg mx-auto" />}
                                                        {parcel.status === 'returned' && <IoReturnDownBack className="text-orange-500 text-lg mx-auto" />}
                                                        {parcel.status === 'cancel' && <FcCancel className="text-base mx-auto" />}

                                                        <br />
                                                        <span className="badge badge-ghost badge-sm">{parcel?.status}</span>
                                                    </td>
                                                    <td className="flex flex-col justify-center items-center p-3">
                                                        {
                                                            parcel.status !== 'onWay' ? <Button onClick={() => handleDelete(parcel._id)} type="primary" icon={<DeleteOutlined />}></Button> : <Button disabled={true} type="primary" icon={<DeleteOutlined />}></Button>
                                                        }
                                                    </td>

                                                    <td onClick={()=>handleDelivered(parcel._id)} className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {
                                                            parcel.status === 'delivered' ? <Button disabled={true} type="primary">Delivered</Button> : <Button type="primary">Delivered</Button>
                                                        }
                                                    </td>

                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Toaster></Toaster>
                            </div>
                                : <div className="flex min-h-[70vh] justify-center items-center">
                                    <Empty></Empty>
                                </div>
                        }





                    </div >
            }
        </div>
    );
};

export default MyDeliveeryList;
