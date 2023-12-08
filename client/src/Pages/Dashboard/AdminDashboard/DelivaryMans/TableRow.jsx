
const TableRow = ({ DeliMan, indx }) => {

    return (
        <tr className="border-b border-b-gray-200 py-10">
            <td className="text-center font-medium">{indx + 1}</td>
            <td className="text-center font-medium">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={DeliMan?.dPhoto ? `${DeliMan.dPhoto}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                    </div>
                </div>
            </td>
            <td className="text-center text-sm font-normal mx-2 lg:mx-2 py-8">
                {DeliMan?.dName}
            </td>
            <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                {DeliMan?.dEmail}
            </td>

            <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                {DeliMan?.dPhone}
            </td>

            <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                {DeliMan?.completeDeliverd?.length}
            </td>

            <td className="text-center  text-basee font-medium mx-2 lg:mx-2">
                {((DeliMan?.dReview.reduce((total, current)=>{
                    return total = parseInt(current.rating) + total
                }, 0)))/(DeliMan?.dReview?.length) || 0}
                
            </td>
        </tr>
    );
};

export default TableRow;