import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure"


const UseGetDeliveryMans = () => {
    const axiosSecure = UseAxiosSecure()
    const {data, isLoading} = useQuery({
        queryKey : ['deliveryMans'],
        queryFn : async()=>{
            const res = await axiosSecure.get('/allDelivaryMan')
            return res.data;
        }
    })
    return {data, isLoading}
};

export default UseGetDeliveryMans;