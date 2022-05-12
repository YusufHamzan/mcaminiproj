import { setLoginData } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
const useAuth = () => {
    const {loginState} = useSelector((state) => state.user);
    // console.log('log_no 1 checking redux state: ', userName, loginState && true);
    const dispatch = useDispatch();

    if (!loginState) {
        const userData = JSON.parse(localStorage.getItem('user_information'));
        // console.log('log_no 2 checking localStorage: ',userData && true);
        if (userData) {
            const payload = {
                loginState: userData.state,
                userName: userData.username,
                uuid: userData.uuid,
                jwt: userData.jwt.access_token
            }
            dispatch(setLoginData(payload));
            // console.log('log_no 3 setting redux state dispatched: ',payload);
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
        
    }
   
}
export default useAuth;
