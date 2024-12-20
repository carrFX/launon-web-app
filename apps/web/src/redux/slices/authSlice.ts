import { getProfileFetchDb } from '@/lib/userLib'
import { IUserState } from '@/type/state/userState'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    id: 0,
    role: "",
    username: "",
    isGoogle: false,
    verified: false,
    email: "",
    avatar: "",
}
export const getProfileState = createAsyncThunk(
    'user/profile',
    async(_, {rejectWithValue}) => {
        try {
            const {result, ok} = await getProfileFetchDb()
            if(!ok) throw new Error(result.message)
            return result.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<IUserState>) => {
            state.isLogin = true
            state.id = action.payload.id
            state.username = action.payload.username
            state.verified = action.payload.verified
            if(action.payload.password == null){
                state.isGoogle = true
            } else {
                state.isGoogle = false
            }
            state.email = action.payload.email
            state.role = action.payload.role
            state.avatar = action.payload.avatar
        },
        logoutAction: (state) => {
            state.isLogin = false
            state.id = 0
            state.username = ""
            state.email = ""
            state.role = ""
            state.avatar = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileState.fulfilled, (state, action: PayloadAction<IUserState>) => {
            state.isLogin = true
            state.id = action.payload.id
            state.username = action.payload.username
            state.verified = action.payload.verified
            if(action.payload.password == null){
                state.isGoogle = true
            } else {
                state.isGoogle = false
            }
            state.email = action.payload.email
            state.role = action.payload.role
            state.avatar = action.payload.avatar
        })
    }
})

export const {loginAction, logoutAction} = userSlice.actions
export default userSlice.reducer