
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../UseAxiosSecure/UseAxiosSecure';

const UseRemoveDeliveryman = () => {
    const axiosSecure = UseAxiosSecure()
    const queryClient = useQueryClient();

    const { mutate: removeDeliveryMan, isSuccess } = useMutation({
        mutationFn: async (delivaryManEmail) => {
            const response = await axiosSecure.delete(`/removeDelivaryMan/${delivaryManEmail}`);
            return response.data;
        },
        onSuccess: (data, delivaryManEmail) => {
            queryClient.invalidateQueries(['deliveryMans']); // Invalidate the overall deliveryMans query
            queryClient.invalidateQueries(`deliveryMan${delivaryManEmail}`); // Invalidate specific deliveryMan query
        },
    });
    return {removeDeliveryMan, isSuccess}
};

export default UseRemoveDeliveryman;