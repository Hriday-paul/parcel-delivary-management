import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const UseGetUser = (email) => {
    const axiosSeqr = UseAxiosSecure();
    const {data, isLoading, refetch} = useQuery({
        queryKey : [`user${email}`, 'users'],
        queryFn : async()=>{
            const data = await axiosSeqr.get(`/userDetails?email=${email}`);
            return data.data;
        }
    })
    return {data, isLoading, refetch}
};

export default UseGetUser;