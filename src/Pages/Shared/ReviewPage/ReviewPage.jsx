import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { BiMessageAltDetail } from "react-icons/bi";
import { Button, Empty } from "antd";
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import UseAddDeliveryMan from "../../../Hooks/UseAddDeliveryMan/UseAddDeliveryMan";
import toast, { Toaster } from "react-hot-toast";


const ReviewPage = () => {
    const { id } = useParams();
    const [parcelData, setParcelData] = useState({});
    const [delivary, setDlivary] = useState({});
    const axiosSecure = UseAxiosSecure();
    const [rating, setRating] = useState(0);
    const message = useRef(null);
    const { addDeliveryMan, isSuccess } = UseAddDeliveryMan();

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#C5C3D8'
    }

    const fetchData = () => {
        axiosSecure.get(`/bookedUser/${id}`)
            .then(({ data }) => {
                setParcelData(data)

                axiosSecure.get(`/delivaryMan/${data.deliveryMan}`)
                    .then(({ data }) => {
                        setDlivary(data)
                    })
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (isSuccess) {
            fetchData();
            toast.success("Thanks for your Review");
            setRating(0)
        }
    }, [isSuccess])

    const handleReview = () => {
        const data = [...delivary.dReview, { name: parcelData.userName, rating, message: message.current.value, date: new Date() }]
        const finalData = ({ dEmail: delivary.dEmail, dReview: data });
        addDeliveryMan(finalData)
    }


    return (
        <div>
            <Helmet>
                <title>Home | Review</title>
            </Helmet>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-5 md:gap-5 my-8 md:my-10 items-center">
                    <div>
                        <img src="https://umbrella.uk.net/wp-content/uploads/2019/04/review.jpg" alt="img" />
                    </div>
                    <div>
                        {
                            delivary && <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 items-center">
                                <div className="col-span-1 flex flex-col justify-center items-center gap-y-5">
                                    <img className="h-28 md:h-36 w-28 md:w-36 rounded-full" src={delivary?.dPhoto ? `${delivary?.dPhoto}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                    <h2 className="text-xl md:text-2xl font-medium">{delivary?.dName}</h2>
                                </div>
                                <div className="col-span-2 border-l border-l-gray-300">
                                    <div className="border-b  border-b-gray-300 p-6 md:p-10">
                                        <h2 className="text-base md:text-lg font-medium mb-2">Email : <span className="ml-2 md:ml-3 lg:ml-5 text-xs md:text-base font-medium">{delivary?.dEmail}</span></h2>

                                    </div>
                                    <div className="p-6 md:p-10 flex flex-row flex-wrap gap-x-16 gap-y-5">
                                        <span className="font-medium flex flex-col justify-center items-center gap-y-2">
                                            <h2 className="text-base md:text-lg font-medium">Phone</h2>
                                            <h4 className="text-sm font-normal">{delivary?.dPhone ? delivary?.dPhone : '_'}</h4>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="bg-slate-100 p-5 space-y-5 rounded-lg">
                    <h1 className="text-3xl font-medium">Review</h1>
                    {
                        delivary?.dReview?.length > 0 ? delivary?.dReview?.map((review, indx) => {
                            return <div key={indx} className="bg-white p-5 md:p-8 rounded-md">
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        {/* <img src={review?.photo} alt="" /> */}
                                        <p className="text-2xl font-medium">{review?.name}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center w-20">
                                            <Rating style={{ maxWidth: 500 }} value={review?.rating} readOnly itemStyles={myStyles} />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-800 my-3">{review?.message}</p>
                                <p className="text-xs">{new Date(review?.date).getDate()+'/'+new Date(review?.date).getMonth()+'/'+new Date(review?.date).getFullYear()}</p>
                            </div>
                        }) : <Empty></Empty>
                    }
                </div>
                <div className="p-10 bg-slate-100 border-b flex gap-x-5">

                    <form className="max-w-sm flex gap-x-1">
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                                <BiMessageAltDetail className="text-2xl"></BiMessageAltDetail>
                            </span>
                            <input ref={message} type="text" name="message" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 " placeholder="Write your review" />
                        </div>
                        <Button onClick={handleReview} type="submit" className="text-white hover:text-white" size="large">Submit</Button>
                    </form>

                    <div className="flex items-center w-36">
                        <Rating style={{ maxWidth: 500 }} value={rating} onChange={setRating} itemStyles={myStyles} />
                    </div>


                    <Toaster></Toaster>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;