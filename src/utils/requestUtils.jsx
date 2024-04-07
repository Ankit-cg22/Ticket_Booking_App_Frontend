export const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL

export const getAxiosConfig = (jwtToken) =>{
    const AXIOS_CONFIG = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": true,
            "Access-Control-Allow-Credentials": true,
            "Authorization" : `Bearer ${jwtToken}`
        }
    };
    
    return AXIOS_CONFIG;
}