import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginState: false,
    userName:'',
    uuid:'',
    jwt:''
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setLoginData:(state, action) => {
            state.loginState = action.payload.loginState;
            state.userName = action.payload.userName;
            state.uuid = action.payload.uuid;
            state.jwt = action.payload.jwt;
        },
        clearLoginData:() => initialState
    }
})
export const {setLoginData, clearLoginData} = userSlice.actions;
export default userSlice.reducer;