import { useContext } from "react";
import UseAdmin from "../../../Hooks/UseAdmin/UseAdmin";
import { authContxt } from "../../../ContextHandler/Authonicate/Authonicate";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Navigate, useLocation } from "react-router-dom";


const AdminPrivate = ({ children }) => {
    const { data, isLoading } = UseAdmin();
    const { loading, userInfo } = useContext(authContxt)
    const location = useLocation();

    if (loading || isLoading) {
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
    if (userInfo && data.admin) {
        return children
    }
    
    return <Navigate to="/" state={{ from: location.pathname }} replace></Navigate>
};

export default AdminPrivate;