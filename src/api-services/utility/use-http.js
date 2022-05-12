import { useState } from "react";
import http from "./http";
const useHttp = () => {
    const [isLoading, setIsLoading ] = useState();
    const [error, setError] = useState(null);
    
    const get = async (url) => {
        init();
        const res = await http.get(url);
        if(!res.state){
            end();
            setError({status:true, message:res.msg});
            return undefined;
        }
        else{
            end();
            return  res;
        }
        
    }
    const post = async (url, postbody) => {
        init();
        const res = await http.post(url, postbody);
        if(!res.state){
            end();
            setError({status:true, message:res.msg});
            return undefined;
        }
        else{
            end();
            return  res;
        }
    }

    const del = async (url, postbody) => {
        setIsLoading(true);
        setError(null);
        
        setIsLoading(false);
    }
    const init = () => {
        setIsLoading(true);
    }

    const end = () => {
        setIsLoading(false);
    }
    
    const https = {get,post,del};
    return [isLoading, error, https];
}
export default useHttp;

