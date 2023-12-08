import axios from "axios"

const axiosSequre = axios.create({
    baseURL: 'https://assignment-12-7zcy.onrender.com',
    // withCredentials : true,
})
function UseAxios() {
  return (
    axiosSequre
  )
}

export default UseAxios