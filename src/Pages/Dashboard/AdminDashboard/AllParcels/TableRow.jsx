import { Button, Spin } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { TiTick } from "react-icons/ti";
import { IoReturnDownBack } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { MdDirectionsRun } from "react-icons/md";
import { LoadingOutlined } from '@ant-design/icons';
import { RxCross2 } from "react-icons/rx";


const TableRow = ({ bookedInfo, indx }) => {
    return (
        <tr className="border-b border-b-gray-200 py-10">
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
            {(new Date(bookedInfo?.reqDate)).getDate() + '/' + ((new Date(bookedInfo?.reqDate)).getMonth() + 1) + '/' + (new Date(bookedInfo?.reqDate)).getFullYear()}
            </td>

            <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                {bookedInfo?.price}
            </td>

            <td className="text-center text-basee font-medium mx-2 lg:mx-2">
                {bookedInfo?.payment ? <TiTick className="text-green-500 text-lg mx-auto" /> : <RxCross2 className="text-red-500 text-lg mx-auto"></RxCross2>}
            </td>

            <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                {
                    bookedInfo?.status === 'pending' && <Spin indicator={
                        <LoadingOutlined style={{ color: '#4096FF', fontSize: 14, }} spin />} />
                }


                {bookedInfo.status === 'onWay' && <MdDirectionsRun className="text-lg"></MdDirectionsRun>}
                {bookedInfo.status === 'delivered' && <TiTick className="text-green-500 text-lg" />}
                {bookedInfo.status === 'returned' && <IoReturnDownBack className="text-orange-500 text-lg" />}
                {bookedInfo.status === 'cancel' && <FcCancel className="text-base" />}

                <br />
                <span className="badge badge-ghost badge-sm">{bookedInfo?.status}</span>

            </td>
            <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                {<Button className="tooltip" data-tip={'mange user'} type="primary" icon={<EditOutlined />} />}
            </td>
        </tr>
    );
};

export default TableRow;