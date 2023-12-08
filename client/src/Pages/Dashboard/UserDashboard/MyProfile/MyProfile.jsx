import { useContext, useState } from "react";
import { authContxt } from "../../../../ContextHandler/Authonicate/Authonicate";
import UseGetUser from "../../../../Hooks/UseGetUser/UseGetUser";
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { Drawer, Space } from 'antd';
import UpdateProfile from "./UpdateProfile/UpdateProfile";

const MyProfile = () => {
    const { userInfo } = useContext(authContxt);
    const { data, isLoading, refetch } = UseGetUser(userInfo.email);
    const [open, setOpen] = useState(false);
    
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    if (isLoading) {
        return <div className="min-h-[60vh] flex justify-center items-center"><Spin indicator={
            <LoadingOutlined style={{ fontSize: 30, }} spin />} /></div>
    }

    return (
        <div className="w-full">
            <div className="p-5 md:p-7 bg-white flex justify-between items-center">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">My Profile</h3>
                <Button size="large" onClick={showDrawer} type="primary" icon={<EditOutlined />}>Update </Button>
                <Drawer title="Update Your proofile"
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
                        open && <UpdateProfile refetch={refetch} userData={data}></UpdateProfile>
                    }
                </Drawer>
            </div>
            <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 items-center">
                    <div className="col-span-1 flex flex-col justify-center items-center gap-y-5">
                        <img className="h-28 md:h-36 w-28 md:w-36 rounded-full" src={data?.photoURL ? `${data?.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        <h2 className="text-xl md:text-2xl font-medium">{data?.name}</h2>
                    </div>
                    <div className="col-span-2 border-l border-l-gray-300">
                        <div className="border-b  border-b-gray-300 p-6 md:p-10">
                            <h2 className="text-base md:text-lg font-medium mb-2">Email : <span className="ml-2 md:ml-3 lg:ml-5 text-xs md:text-base font-medium">{data?.email}</span></h2>
                            <h2 className="text-base md:text-lg font-medium">User Id : <span className="ml-2 md:ml-3 lg:ml-5 text-xs md:text-base font-medium">{data?._id}</span></h2>
                        </div>
                        <div className="p-6 md:p-10 flex flex-row flex-wrap gap-x-16 gap-y-5">
                            <span className="font-medium flex flex-col justify-center items-center gap-y-2">
                                <h2 className="text-base md:text-lg font-medium">Phone</h2>
                                <h4 className="text-sm font-normal">{data?.phone ? data?.phone : '_'}</h4>
                            </span>
                            <span className="font-medium flex flex-col justify-center items-center gap-y-2">
                                <h2 className="text-base md:text-lg font-medium">User Name</h2>
                                <h4 className="text-sm font-normal">{data?.name}</h4>
                            </span>
                            <span className="font-medium flex flex-col justify-center items-center gap-y-2">
                                <h2 className="text-base md:text-lg font-medium">Password</h2>
                                <h4 className="text-sm font-normal">{data?.password ? data?.password : '_'}</h4>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyProfile;