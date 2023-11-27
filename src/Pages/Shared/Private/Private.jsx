
import { useContext } from 'react'
import { authContxt } from '../../../ContextHandler/Authonicate/Authonicate'
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


function Private({ children }) {
    const { userInfo, loading } = useContext(authContxt);
    const location = useLocation();

    if (loading) {
        return <div className="min-h-[90vh] flex justify-center items-center">
            <Spin
            size='large'
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 40,
                            fontWeight : 'bold'
                        }}
                        spin
                    />
                }
            />
            {/* <iframe className='h-[100px] w-80' src="https://lottie.host/embed/8dcb3f40-8ac6-495d-9edc-99f9fd9c4cb3/XTeOouwT9o.json"></iframe> */}
        </div>
    }

    else if (userInfo) {
        return children;
    }

    return <Navigate state={{from : location.pathname}} to="/login" replace></Navigate>
}

export default Private