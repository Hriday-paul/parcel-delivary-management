import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContxt } from "../../ContextHandler/Authonicate/Authonicate";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const UseAdmin = () => {
    const {userInfo} = useContext(authContxt);
    const axiosSecure = UseAxiosSecure();

    const {data, isLoading} = useQuery({
        queryKey : [`admin${userInfo.email}`, `user${userInfo.email}`, 'users'],
        queryFn : async()=>{
            const result = await axiosSecure.get(`/user/admin?email=${userInfo.email}`)
            return result.data
        }
    })
    return {data, isLoading}
};

export default UseAdmin;