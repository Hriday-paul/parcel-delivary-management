
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import UseAdmin from '../../../Hooks/UseAdmin/UseAdmin';
import AdminDashBoardHome from '../AdminDashboard/AdminHome/AdminDashBoardHome';

const HomeDashboard = () => {
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
            {data.admin ? <AdminDashBoardHome /> : <></>}
        </div>
    );

};

export default HomeDashboard;