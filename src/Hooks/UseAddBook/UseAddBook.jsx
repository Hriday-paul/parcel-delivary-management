import toast from "react-hot-toast";
import UseAxios from "../../Hooks/UseAxios/UseAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UseAddBook = () => {
    const axiosPublic = UseAxios();
    const queryClient = useQueryClient();
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (parcelInfo) => {
            const data = await axiosPublic.post('/newBook', parcelInfo);
            return data.data;
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch
            if (data.acknowledged) {
                toast.success('Your book added successfully');
            }
            else {
                toast.error('Something wents wrong');
            }
            // queryClient.invalidateQueries([`addBook${variables.email}`, 'book']);
            queryClient.invalidateQueries('books');
        },

        onError: () => {
            toast.error('Something wents wrong, try again.');
        },
    })

    return { mutate, isPending, isSuccess }
};

export default UseAddBook;