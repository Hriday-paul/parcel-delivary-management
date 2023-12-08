
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { authContxt } from "../../ContextHandler/Authonicate/Authonicate";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const UseDeliveryMan = () => {
    const {userInfo} = useContext(authContxt);
    const axiosSecure = UseAxiosSecure();

    const {data:deliveryData, isLoading:DelivLoading} = useQuery({
        queryKey : [`deliveryMan${userInfo.email}`,],
        queryFn : async()=>{
            const result = await axiosSecure.get(`/user/deliveryMan?email=${userInfo.email}`)
            return result.data
        }
    })
    
    return {deliveryData, DelivLoading}
};

export default UseDeliveryMan;