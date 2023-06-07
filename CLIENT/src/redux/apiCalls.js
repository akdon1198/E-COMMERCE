import { loginStart, loginFailure, loginSuccess, registerStart, registerFailure, registerSuccess , logout} from "./userRedux";
import {publicRequest} from "../requestMethods"

export const login = async(dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure())
        
    }
}

export const register = async(dispatch, user) =>{
    dispatch(registerStart())
    try{
        const res = await publicRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data))
        console.log("success")
    }catch(err){
        dispatch(registerFailure())
    }
}

export const logoutfun = (dispatch) => {
    const newUser = {
        currentUser : null, 
        isFetching : false,
        error : false
    }
    const obj = JSON.stringify(newUser)
    localStorage.setItem("persist:root", obj)
    dispatch(logout())
}