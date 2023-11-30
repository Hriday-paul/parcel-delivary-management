import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { Button, Empty, Pagination, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { RiAdminLine } from "react-icons/ri";
import { IoIosBicycle } from "react-icons/io";
import { DeleteOutlined } from '@ant-design/icons';
import toast, { Toaster } from "react-hot-toast";
import TableRow from "./TableRow";
import axios from "axios";

const DelivaryMans = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/allDeliveryMan')
            .then(({ data }) => {
                setLoading(false)
                setData(data)
            })
            .catch(()=>{
                setLoading(false)
            })
    })
    return (
        <div>
            <div className="p-5 md:p-7 bg-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">All Users</h3>
            </div>
            {
                loading ? <div className="min-h-[60vh] bg-white flex justify-center items-center"><Spin indicator={
                    <LoadingOutlined style={{ fontSize: 30, }} spin />} /></div> :

                    <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                        {
                            data.length > 0 ? <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-sm border-b border-b-gray-200">
                                        <th></th>
                                        <th className="font-medium text-gray-600">Image</th>
                                        <th className="font-medium text-gray-600 py-5">Name</th>
                                        <th className="font-medium text-gray-600">Email</th>
                                        <th className="font-medium text-gray-600">Phone</th>

                                    </thead>
                                    <tbody>
                                        {
                                            data.map(async(user, indx) => {
                                                const data = await axios.get("http://localhost:4000")
                                                return <TableRow key={indx} user={user} indx={indx}></TableRow>
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

export default DelivaryMans;