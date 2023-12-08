import { Spin } from "antd";
import UseAdmin from "../../Hooks/UseAdmin/UseAdmin";
import AdminRoot from "./AdminDashboard/AdminRoot/AdminRoot";
import UserDashboard from "./UserDashboard/UserDashboard";
import { LoadingOutlined } from '@ant-design/icons';



const Dashboard = () => {
    const { data, isLoading } = UseAdmin();


    if (isLoading) {
        return <div className="min-h-[90vh] flex justify-center items-center">
            <Spin
                size='large'
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 40,
                            fontWeight: 'bold'
                        }}
                        spin
                    />
                }
            />
        </div>
    }

    return (
        <div>
            {
                data.admin ? <AdminRoot></AdminRoot> : <UserDashboard></UserDashboard>
            }
        </div>
    );
};

export default Dashboard;