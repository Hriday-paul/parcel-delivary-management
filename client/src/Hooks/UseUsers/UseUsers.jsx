import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const UseUsers = (limit, pageNumber) => {
    const axiosSeqr = UseAxiosSecure();
    const {data, isLoading, refetch, isSuccess} = useQuery({
        queryKey : ['allUsers', pageNumber, 'users'],
        queryFn : async()=>{
            const result = await axiosSeqr.get(`/allUsers?limit=${limit}&&pageNumber=${pageNumber}`)
            return result.data;
        },
        keepPreviousData : true,
        
    })
    return {data, isLoading, refetch, isSuccess}
};

export default UseUsers;