import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null},
    reducers: {
        loggedIn(state, action) {
            state.token = action.payload
        },
        loggedOut(state) {
            state.token = null
        }
    }
})

export const { loggedIn, loggedOut } = authSlice.actions
export default authSlice.reducer