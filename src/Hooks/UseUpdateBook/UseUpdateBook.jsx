import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";
import toast from "react-hot-toast";

const UseUpdateBook = () => {
    const axiosSeqr = UseAxiosSecure();
    const queryClient = useQueryClient();
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (parcelInfo) => {
            const data = await axiosSeqr.put('/updateBook', parcelInfo);
            return data.data;
        },
        onSuccess: (data, variables) => {
            if (data.modifiedCount) {
                toast.success('Your book update successfully');
            }
            else {
                toast.error('updaate failed');
            }
            queryClient.invalidateQueries({ queryKey: [`addBook${variables.email}`, 'books'] });
        },

        onError: () => {
            toast.error('Something wents wrong, try again.');
        },
    })

    return { mutate, isPending, isSuccess }
};

export default UseUpdateBook;