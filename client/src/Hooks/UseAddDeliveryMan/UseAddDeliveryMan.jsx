import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../UseAxios/UseAxios";


const UseAddDeliveryMan = () => {
    const axiosPublic = UseAxios();
    const queryClient = useQueryClient();
    const { mutate:addDeliveryMan, isSuccess } = useMutation({
        mutationFn: async (delivaryManInfo) => {
            const data = await axiosPublic.put('/updateDelivaryMan', delivaryManInfo);
            return data.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['deliveryMan', `deliveryMan${variables.dEmail}`]);

            // Invalidate all deliverymen query
            queryClient.invalidateQueries('deliveryMans');
        },
    })
    return {addDeliveryMan, isSuccess}
};

export default UseAddDeliveryMan;