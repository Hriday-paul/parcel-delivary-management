import axios from "axios"
import { useContext, useEffect } from "react";
import { authContxt } from "../../ContextHandler/Authonicate/Authonicate";

const secure = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
})

function UseAxiosSecure() {
    const { logOutUser } = useContext(authContxt);
    useEffect(() => {
        secure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response.status) {
                console.log(error)
                //logOutUser();
            }
        })
    }, [])
    return secure
}

export default UseAxiosSecure