import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../UseAxios/UseAxios";
import toast from "react-hot-toast";

const UpdateUser = () => {
    const queryClient = useQueryClient();
    const axiosSequre = UseAxios();
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (userInfo) => {
            const data = await axiosSequre.put('/adduser', userInfo);
            return data.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [`user${variables.email}`, `users`] });
        },

        onError: () => {
            toast.error('Something wents wrong, try agaain');
        },
    })

    return { mutate, isPending, isSuccess }
};

export default UpdateUser;