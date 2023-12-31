import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../UseAxios/UseAxios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddUser = () => {
    const queryClient = useQueryClient();
    const { state } = useLocation();
    const navig = useNavigate();
    const axiosSequre = UseAxios();
    const { mutate, isPending } = useMutation({
        mutationFn: async (userInfo) => {
            const data = await axiosSequre.put('/adduser', userInfo);
            return data.data;
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch
            toast.success('Registration Successfully');
            state ? navig(`${state.from}`) : navig(`/`)
        
            queryClient.invalidateQueries({ queryKey: [`user${variables.email}`, `admin${variables.email}`, `users`] });
        },

        onError: () => {
            toast.error('Something wents wrong');
        },
    })

    return { mutate, isPending }
};

export default AddUser;