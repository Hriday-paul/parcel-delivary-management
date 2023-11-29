import { useContext, useState } from "react";
import UseMyparcels from "../../../../Hooks/UseMyparcels/UseMyparcels";
import { authContxt } from "../../../../ContextHandler/Authonicate/Authonicate";
import { Button, Empty, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { MdDirectionsRun } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoReturnDownBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { TbMessage2Plus } from "react-icons/tb";
import { Drawer, Space } from 'antd';
import UpdateParcel from "./UpdateParcel/UpdateParcel";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const MyParcels = () => {
    const { userInfo } = useContext(authContxt);
    const { data, isLoading } = UseMyparcels(userInfo.email);
    const [updateParcel, setUpdateParcel] = useState("");
    const axiosSecure = UseAxiosSecure();

    const [open, setOpen] = useState(false);
    const showDrawer = (parcel) => {
        setUpdateParcel(parcel)
        setOpen(true);
    };
    const onClose = () => {
        setUpdateParcel("");
        setOpen(false);
    };

    const handleDelete = (id) => {

        Swal.fire({
            text: "Are you sure want to delete this food !",
            icon: `warning`,
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            showCloseButton: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/deleteFood?id=${id}`)
                        .then(() => {
                            setFoods(filter)
                        })
                }
                
            })
    }



    return (
        <div className="w-full">
            <div className="p-5 md:p-7 bg-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">{'My Booking Parcels'}</h3>
            </div>
            <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                {
                    isLoading ? <div className="min-h-[60vh] flex justify-center items-center"><Spin indicator={
                        <LoadingOutlined style={{ fontSize: 30, }} spin />} /></div> :
                        <div>
                            {
                                data ?
                                    <div className="">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="text-sm border-b border-b-gray-200">
                                                    <th></th>
                                                    <th className="font-medium text-gray-600 py-5">Parcel Type</th>
                                                    <th className="font-medium text-gray-600">Requested Date</th>
                                                    <th className="font-medium text-gray-600">Booking Date</th>
                                                    <th className="font-medium text-gray-600">Delivery Men</th>
                                                    <th className="font-medium text-gray-600">Status</th>
                                                    <th className="font-medium text-gray-600">Pay Ballance</th>
                                                    <th className="font-medium text-gray-600">Update</th>
                                                    <th className="font-medium text-gray-600">Review</th>
                                                    <th className="font-medium text-gray-600">Cancel</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data && data.map((parcel, indx) => {
                                                            return <tr key={parcel._id} className="border-b border-b-gray-200 py-10">
                                                                <td className="text-center font-medium">{indx + 1}</td>
                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    {parcel?.percelType}
                                                                </td>
                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    {parcel?.reqDate?.day + "/" + parcel?.reqDate?.month + "/" + parcel?.reqDate?.year}
                                                                </td>
                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    {(new Date(parcel?.bookDate)).getDate() + '/' + ((new Date(parcel?.bookDate)).getMonth() + 1) + '/' + (new Date(parcel?.bookDate)).getFullYear()}
                                                                </td>
                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    {parcel?.deliveryMan ? parcel?.deliveryMan : 'none'}
                                                                </td>
                                                                <td className="flex flex-col justify-center items-center p-3">
                                                                    {parcel.status === 'pending' && <Spin indicator={
                                                                        <LoadingOutlined style={{ color: '#4096FF', fontSize: 14, }} spin />} />}

                                                                    {parcel.status === 'onWay' && <MdDirectionsRun className="text-lg"></MdDirectionsRun>}
                                                                    {parcel.status === 'delivered' && <TiTick className="text-green-500 text-lg" />}
                                                                    {parcel.status === 'returned' && <IoReturnDownBack className="text-orange-500 text-lg" />}
                                                                    {parcel.status === 'cancel' && <FcCancel className="text-base" />}

                                                                    <br />
                                                                    <span className="badge badge-ghost badge-sm">{parcel?.status}</span>
                                                                </td>

                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    <Button type="primary">Pay now $</Button>
                                                                </td>

                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    <Button onClick={() => showDrawer(parcel)} type="primary" icon={<EditOutlined />} />

                                                                    <Drawer title="Update Your Parcel Information"
                                                                        width={720}
                                                                        onClose={onClose}
                                                                        open={open}
                                                                        styles={{ body: { paddingBottom: 80, }, }} extra={
                                                                            <Space>
                                                                                <Button className="text-white hover:text-white" onClick={onClose}>Cancel</Button>
                                                                            </Space>
                                                                        }
                                                                    >
                                                                        {
                                                                            updateParcel && <UpdateParcel parcelInfo={updateParcel}></UpdateParcel>
                                                                        }
                                                                    </Drawer>

                                                                </td>
                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    <Button type="primary" icon={<TbMessage2Plus />} />
                                                                </td>
                                                                <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                                    <Button onClick={() => handleDelete(parcel._id)} type="primary" icon={<DeleteOutlined />}></Button>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div >
                                    : <div>
                                        <Empty></Empty>
                                    </div>
                            }
                        </div>
                }
            </div>
        </div >
    );
};

export default MyParcels;