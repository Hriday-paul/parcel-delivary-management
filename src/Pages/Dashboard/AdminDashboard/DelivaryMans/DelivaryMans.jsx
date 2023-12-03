import {  Empty,  Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import  { Toaster } from "react-hot-toast";
import TableRow from "./TableRow";
import UseGetDeliveryMans from "../../../../Hooks/UseAddDeliveryMan/UseGetDeliveryMans";

const DelivaryMans = () => {
    const {data:dData, isLoading} = UseGetDeliveryMans();

    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const axiosSecure = UseAxiosSecure();

    // useEffect(() => {
    //     axiosSecure.get('/allDelivaryMan')
    //         .then(({ data }) => {
    //             setLoading(false);
    //             setData(data);
    //             console.log(data)
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <div>
            <div className="p-5 md:p-7 bg-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">All Delivery mans</h3>
            </div>
            {
                isLoading ? <div className="min-h-[60vh] bg-white flex justify-center items-center"><Spin indicator={
                    <LoadingOutlined style={{ fontSize: 30 }} spin />} /></div> :

                    <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                        {
                            dData.length > 0 ? <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-sm border-b border-b-gray-200">
                                        <th></th>
                                        <th className="font-medium text-gray-600">Image</th>
                                        <th className="font-medium text-gray-600 py-5">Name</th>
                                        <th className="font-medium text-gray-600">Email</th>
                                        <th className="font-medium text-gray-600">Phone</th>
                                        <th className="font-medium text-gray-600">Complete Deli..</th>
                                        <th className="font-medium text-gray-600">Avg. review</th>
                                    </thead>
                                    <tbody>
                                        {
                                            dData.map((dMan, indx) => {
                                                return <TableRow key={indx} DeliMan={dMan} indx={indx}></TableRow>
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

                    </div>
            }
        </div>
    );
};

export default DelivaryMans;
