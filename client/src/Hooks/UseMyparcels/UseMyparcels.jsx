import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";


const UseMyparcels = (email) => {
    const axiosSeqr = UseAxiosSecure();
    const {data, isLoading, refetch} = useQuery({
        queryKey : [`addBook${email}`, 'book'],
        queryFn : async()=>{
            const data = await axiosSeqr.get(`/booked?email=${email}`);
            return data.data;
        }
    })
    return {data, isLoading, refetch}
    
};

export default UseMyparcels;