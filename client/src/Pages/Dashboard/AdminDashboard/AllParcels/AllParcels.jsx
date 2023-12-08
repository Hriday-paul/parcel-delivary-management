import { Toaster } from "react-hot-toast";
import { Button, Empty, Modal, Select, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import DateRangeCom from "./DateRangeCom";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { IoSearch } from "react-icons/io5";
import { EditOutlined } from '@ant-design/icons';
import { TiTick } from "react-icons/ti";
import { IoReturnDownBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { MdDirectionsRun } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import UseUpdateBook from "../../../../Hooks/UseUpdateBook/UseUpdateBook";
import UseAddDeliveryMan from "../../../../Hooks/UseAddDeliveryMan/UseAddDeliveryMan";


const AllParcels = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allDelivaryMans, setAllDelivarymans] = useState([]);
    const [delivaryMan, setDelivaryMan] = useState('');
    const [status, setStatus] = useState('');
    const [parcelId, setParcelId] = useState('')
    const { mutate, isSuccess:updateParcels } = UseUpdateBook();
    const axiosSecure = UseAxiosSecure();
    const {mutate:updateDelivaryMan} = UseAddDeliveryMan();


    const [Dates, setDates] = useState([
        {
            startDate: null,
            endDate: new Date(),
            key: 'selection'
        }
    ]); 

    useEffect(() => {
        axiosSecure.get('/allDelivaryMan')
            .then(({ data }) => {
                const list = data.map((d) => {
                    return { value: d._id, label: d.dName }
                })
                setAllDelivarymans(list)
            })
    }, [])


    const fetchdata = () => {
        //setLoading(true);
        const startDate = new Date(Dates[0].startDate).getTime()
        const endDate = new Date(Dates[0].endDate).getTime();
        axiosSecure.get(`/allParcelList/${startDate}/${endDate}`)
            .then(({ data }) => {
                setLoading(false);
                setData(data);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchdata();
    }, [Dates]);

    useEffect(()=>{
        if(updateParcels){
            fetchdata();
            setStatus('');
            setParcelId('');
            setDelivaryMan('');
        }
    }, [updateParcels])

    const handleChangeDeliva = (value) => {
        setDelivaryMan(value);
    };

    const handleChangeStatus = (value) => {
        setStatus(value);
    };

    const showModal = (bookInfo) => {
        setParcelId(bookInfo);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log(parcelId)
        setIsModalOpen(false);
        if (status && delivaryMan) {
            mutate({ id: parcelId._id, status, deliveryMan: delivaryMan })
        }
        else if (status && !delivaryMan) {
            mutate({ id: parcelId._id, status })
        }
        else if (!status && delivaryMan) {
            mutate({ id: parcelId._id, deliveryMan: delivaryMan })
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="p-5 md:p-7 bg-white flex justify-between items-center">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">All Parcels</h3>
                <div className="relative group">
                    <Button type="primary" size="large" className="tooltip" data-tip={'Find parcel with req. delivary date'} icon={<IoSearch />}> Search Parcel</Button>
                    <div className="absolute top-10 shadow-2xl right-0 z-50 border-blue-400 border-2 hidden group-hover:block">
                        <DateRangeCom ranges={Dates} setState={setDates}></DateRangeCom>
                    </div>
                </div>
            </div>
            {
                loading ? <div className="min-h-[60vh] bg-white flex justify-center items-center"><Spin indicator={
                    <LoadingOutlined style={{ fontSize: 30 }} spin />} /></div> :

                    <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                        {
                            data.length > 0 ? <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-sm border-b border-b-gray-200">

                                        <th></th>
                                        <th className="font-medium text-gray-600 py-5">Name</th>
                                        <th className="font-medium text-gray-600">Phone</th>
                                        <th className="font-medium text-gray-600">Book Date</th>
                                        <th className="font-medium text-gray-600">Req. Deli. Date</th>
                                        <th className="font-medium text-gray-600">Cost</th>
                                        <th className="font-medium text-gray-600">Payment com.</th>
                                        <th className="font-medium text-gray-600">Delivary man</th>
                                        <th className="font-medium text-gray-600">Status</th>
                                        <th className="font-medium text-gray-600">Manage</th>

                                    </thead>
                                    <tbody>
                                        {
                                            data.map((bookedInfo, indx) => {
                                                return <tr key={indx} className="border-b border-b-gray-200 py-10">
                                                    <td className="text-center font-medium">{indx + 1}</td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2 py-8">
                                                        {bookedInfo?.userName}
                                                    </td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2 py-8">
                                                        {bookedInfo?.phone}
                                                    </td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {(new Date(bookedInfo?.bookDate)).getDate() + '/' + ((new Date(bookedInfo?.bookDate)).getMonth() + 1) + '/' + (new Date(bookedInfo?.bookDate)).getFullYear()}
                                                    </td>

                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {(new Date(bookedInfo?.reqDate)).getDate() + '/' + ((new Date(bookedInfo?.reqDate)).getMonth()+1 ) + '/' + (new Date(bookedInfo?.reqDate)).getFullYear()}
                                                    </td>

                                                    <td className="text-center  text-base font-medium mx-2 lg:mx-2">
                                                        {bookedInfo?.price}
                                                    </td>

                                                    <td className="text-center text-base font-medium mx-2 lg:mx-2">
                                                        {bookedInfo?.payment ? <TiTick className="text-green-500 text-lg mx-auto" /> : <RxCross2 className="text-red-500 text-lg mx-auto"></RxCross2>}
                                                    </td>

                                                    <td className="text-center text-xs font-medium mx-2 lg:mx-2">
                                                        {bookedInfo?.deliveryMan}
                                                    </td>

                                                    <td className="text-center  text-base font-medium mx-2 lg:mx-2">
                                                        {
                                                            bookedInfo?.status === 'pending' && <Spin indicator={
                                                                <LoadingOutlined style={{ color: '#4096FF', fontSize: 14, }} spin />} />
                                                        }


                                                        {bookedInfo.status === 'onWay' && <MdDirectionsRun className="text-lg mx-auto"></MdDirectionsRun>}
                                                        {bookedInfo.status === 'delivered' && <TiTick className="text-green-500 text-lg mx-auto" />}
                                                        {bookedInfo.status === 'returned' && <IoReturnDownBack className="text-orange-500 text-lg mx-auto" />}
                                                        {bookedInfo.status === 'cancel' && <FcCancel className="text-base mx-auto" />}

                                                        <br />
                                                        <span className="badge badge-ghost badge-sm">{bookedInfo?.status}</span>

                                                    </td>
                                                    <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                                                        {<Button onClick={() => showModal(bookedInfo)} className="tooltip" data-tip={'mange user'} type="primary" icon={<EditOutlined />} />}
                                                    </td>
                                                    <Modal title="Mange this parcel" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                                                        <label htmlFor="delivaryMan" className="block mb-2 text-sm font-medium text-gray-900">Coose a delivery man<span className="text-red-500">*</span></label>
                                                        <Select
                                                            id={'delivaryMan'}
                                                            className="w-full"
                                                            placeholder="Choose a delivery man"
                                                            onChange={handleChangeDeliva}
                                                            options={allDelivaryMans}
                                                        />

                                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Coose status</label>
                                                        <Select
                                                            id='status'
                                                            className="w-full"
                                                            placeholder="Choose a delivery man"
                                                            onChange={handleChangeStatus}
                                                            options={[
                                                                {
                                                                    value: 'pending',
                                                                    label: 'pending',
                                                                },
                                                                {
                                                                    value: 'onWay',
                                                                    label: 'onWay',
                                                                },
                                                                {
                                                                    value: 'delivered',
                                                                    label: 'delivered',
                                                                },

                                                            ]}
                                                        />

                                                    </Modal>
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

                    </div>
            }
        </div>
    );
};

export default AllParcels;