import { useEffect, useState } from "react";
import UseUsers from "../../../../Hooks/UseUsers/UseUsers";
import { Button, Empty, Pagination, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { RiAdminLine } from "react-icons/ri";
import { IoIosBicycle } from "react-icons/io";
import { DeleteOutlined } from '@ant-design/icons';
import UpdateUser from "../../../../Hooks/AddUser/UpdateUser";
import toast, { Toaster } from "react-hot-toast";


const AllUsers = () => {
    const [limit, setLimit] = useState(5);
    const [pagenumber, setPagenumber] = useState(1);
    const { data, isLoading, refetch } = UseUsers(limit, pagenumber);

    const { mutate, isSuccess } = UpdateUser();

    const onChangePage = (pageNum) => {
        setPagenumber(pageNum);
    };

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success('update successfully')
        }
    }, [isSuccess])

    const addAdmin = (id, email) => {
        mutate({ userType: 'admin', email: email })
    }

    const addDeliveryMan = (id, email) => {
        mutate({ userType: 'deliveryMan', email: email })
    }

    const addUser = (id, email) => {
        mutate({ userType: 'user', email: email })
    }



    return (
        <div>
            <div className="p-5 md:p-7 bg-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">All Users</h3>
            </div>
            {
                isLoading ? <div className="min-h-[60vh] bg-white flex justify-center items-center"><Spin indicator={
                    <LoadingOutlined style={{ fontSize: 30, }} spin />} /></div> :

                    <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                        {
                            data?.data ? <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-sm border-b border-b-gray-200">
                                        <th></th>
                                        <th className="font-medium text-gray-600">Image</th>
                                        <th className="font-medium text-gray-600 py-5">Name</th>
                                        <th className="font-medium text-gray-600">Email</th>
                                        <th className="font-medium text-gray-600">Phone</th>
                                        {/* <th className="font-medium text-gray-600">Parcel Booked</th> */}
                                        <th className="font-medium text-gray-600">User Type</th>
                                        <th className="font-medium text-gray-600">Set Admin</th>
                                        <th className="font-medium text-gray-600">Set DeliveryMan</th>
                                        {/* <th className="font-medium text-gray-600">Review</th> */}

                                    </thead>
                                    <tbody>
                                        {
                                            data?.data && data?.data.map((user, indx) => {
                                                return (
                                                    <tr key={indx} className="border-b border-b-gray-200 py-10">
                                                        <td className="text-center font-medium">{indx + 1}</td>
                                                        <td className="text-center font-medium">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={user?.photoURL ? `${user.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center text-sm font-normal mx-2 lg:mx-2 py-8">
                                                            {user?.name}
                                                        </td>
                                                        <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                            {user?.email}
                                                        </td>
                                                        
                                                        <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                            {user?.phone}
                                                        </td>

                                                        <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                                                            {user?.userType}
                                                        </td>

                                                        <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                            {
                                                                user?.userType !== 'admin' ? <Button onClick={() => addAdmin(user._id, user?.email)} className="tooltip" data-tip={user?.email == 'admin@gmail.com' ? 'root admin' : 'add admin'} type="primary" icon={<RiAdminLine />} disabled={user?.email == 'admin@gmail.com'} />

                                                                    :

                                                                    <Button onClick={() => addUser(user._id, user?.email)} className="tooltip" data-tip={user?.email == 'admin@gmail.com' ? 'root admin' : 'cencel admin'} type="primary" icon={<DeleteOutlined />} disabled={user?.email == 'admin@gmail.com'} />

                                                            }

                                                        </td>
                                                        <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                            {
                                                                user?.userType !== 'deliveryMan' ? <Button onClick={() => addDeliveryMan(user._id, user?.email)} className="tooltip"
                                                                    data-tip={user?.email == 'admin@gmail.com' ? 'root admin' : 'add delivery man'}
                                                                    type="primary" icon={<IoIosBicycle />} disabled={user?.email == 'admin@gmail.com'} />

                                                                    :

                                                                    <Button onClick={() => addUser(user._id, user?.email)} className="tooltip"
                                                                        data-tip={user?.email == 'admin@gmail.com' ? 'root admin' : 'cencel delivery man'}
                                                                        type="primary" icon={<DeleteOutlined />} disabled={user?.email == 'admin@gmail.com'} />
                                                            }
                                                        </td>
                                                        <td className="text-center text-sm font-normal mx-2 lg:mx-2">

                                                        </td>
                                                    </tr>
                                                )
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



                        <div className="mx-auto flex justify-center py-10 ">
                            <Pagination defaultCurrent={1} current={pagenumber} onChange={onChangePage} pageSize={limit} total={data.len} />
                        </div>

                    </div >
            }
        </div>

    );
}
export default AllUsers;

