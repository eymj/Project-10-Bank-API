import { configureStore } from '@reduxjs/toolkit'
import profileReducer, {fetchProfile} from './features/profile/profileSlice'
import authReducer, { loggedIn, loggedOut } from './features/auth/authSlice'
import { createListenerMiddleware } from '@reduxjs/toolkit'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: loggedIn,
  effect: async (action, listenerApi) => {
    try {
      await listenerApi.dispatch(fetchProfile()).unwrap()
    } catch {
      listenerApi.dispatch(loggedOut())
    }
  }
})

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(listenerMiddleware.middleware),
})

export default store