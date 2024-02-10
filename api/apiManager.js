import axios from "axios"
const ApiManger = axios.create({
    baseURL :"https://ismailshop-backend.onrender.com/rest",
    responseType:'json',
    withCredentials:true
})

export default ApiManger;