import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../UseAxios/UseAxios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddUser = () => {
    const queryClient = useQueryClient();
    //const { state } = useLocation();
    //const navig = useNavigate();
    const axiosSequre = UseAxios();
    const { mutate, isPending } = useMutation({
        mutationFn: async (userInfo) => {
            const data = await axiosSequre.put('/adduser', userInfo);
            return data.data;
        },
        onSuccess: (data, variables) => {
            // Invalidate and refetch
            if (data.upsertedCount || data.modifiedCount) {
                toast.success('Registration Successfully');
                //state ? navig(`${state}`) : navig(`/`)
            }
            else{
                toast.error('Something wents wrong');
            }
            queryClient.invalidateQueries({ queryKey: [variables.email] });
        },

        onError: () => {
            toast.error('Something wents wrong');
        },
    })

    return { mutate, isPending }
};

export default AddUser;