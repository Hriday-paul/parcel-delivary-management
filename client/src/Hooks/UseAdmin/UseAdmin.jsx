import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { authContxt } from "../../ContextHandler/Authonicate/Authonicate";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const UseAdmin = () => {
    const {userInfo} = useContext(authContxt);
    const axiosSecure = UseAxiosSecure();

    const {data, isLoading} = useQuery({
        queryKey : [`admin${userInfo.email}`, 'users',],
        queryFn : async()=>{
            const result = await axiosSecure.get(`/user/admin?email=${userInfo.email}`)
            return result.data
        }
    })
    
    // const [isLoading, setIsLoading] = useState(true);
    // const [data, setData] = useState([])

    // useEffect(()=>{
    //     axiosSecure.get(`/user/admin?email=${userInfo.email}`)
    //     .then(({data})=>{
    //         setData(data)
    //         console.log(data)

    //         setIsLoading(false)
    //     })
    // }, [])
    return {data, isLoading}
};

export default UseAdmin;