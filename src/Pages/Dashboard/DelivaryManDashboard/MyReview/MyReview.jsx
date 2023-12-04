import { Empty, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { LoadingOutlined } from '@ant-design/icons';
import { authContxt } from "../../../../ContextHandler/Authonicate/Authonicate";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { Rating, Star } from '@smastrom/react-rating'

const MyReview = () => {
    const [isLoading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([]);
    const { userInfo } = useContext(authContxt);
    const axiosSecure = UseAxiosSecure();

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#C5C3D8'
    }

    useEffect(() => {
        axiosSecure.get(`/deliveryManInfo/${userInfo.email}`)
            .then(({ data }) => {
                setLoading(false)
                setReviews(data.dReview)
            })
    }, [])
    console.log(reviews)
    return (
        <div>
            <div className="p-5 md:p-7 bg-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">My Reviews</h3>
            </div>
            {
                isLoading ? <div className="min-h-[60vh] bg-white flex justify-center items-center"><Spin indicator={
                    <LoadingOutlined style={{ fontSize: 30, }} spin />} /></div> :

                    <div className="bg-white border-t-4 border-t-[#3B82F6] m-8 md:m-14 px-8 py-10 rounded-md min-h-[70vh]">
                        {
                            reviews ? <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-sm border-b border-b-gray-200">
                                        <th></th>

                                        <th className="font-medium text-gray-600">Reviewrs Name</th>
                                        <th className="font-medium text-gray-600 py-5">Review Date</th>
                                        <th className="font-medium text-gray-600">Review Rating</th>

                                    </thead>
                                    <tbody>
                                        {
                                            reviews && reviews.map((review, indx) => {
                                                return <tr key={indx} className="border-b border-b-gray-200 py-10">
                                                    <td className="text-center font-medium">{indx + 1}</td>

                                                    <td className="text-center text-sm font-normal mx-2 py-5 lg:mx-2">
                                                        {review?.name}
                                                    </td>
                                                    <td className="text-center text-sm font-normal mx-2 lg:mx-2">
                                                        {
                                                            <p className="text-xs">{new Date(review?.date).getDate() + '/' + new Date(review?.date).getMonth() + '/' + new Date(review?.date).getFullYear()}</p>
                                                        }
                                                    </td>
                                                    <td className="text-center  mx-auto text-sm font-normal lg:mx-2">
                                                        {
                                                            <div className="w-20 mx-auto">
                                                                <Rating style={{ maxWidth: 500 }} value={review?.rating} readOnly itemStyles={myStyles} />
                                                            </div>
                                                        }
                                                    </td>

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





                    </div >
            }
        </div>
    );
};

export default MyReview;