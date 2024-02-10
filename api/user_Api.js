import ApiManger from "./apiManager";

export const user_login = async data => {
    try{
        const result = await ApiManger('/auth/login' , {
            method:'Post',
            headers:{
                'Content-Type':'application/json',
                

            },
            data:data,
        });
        return result;
    }catch(error){
        return error.response.data;
    }
};

export const fetchTshitsData = async (data, token) => {
    try{
        const result = await ApiManger('/api/tshirts' , {
            method:'Get',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`

            },
            data:data,
        });
        return result;
    }catch(error){
        return error.response.data;
    }
};