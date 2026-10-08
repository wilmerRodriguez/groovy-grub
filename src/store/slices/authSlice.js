import { createSlice } from '@reduxjs/toolkit'

// Demo-only auth: no real backend, the "session" lives in Redux (persisted to localStorage).
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    signIn(state, { payload: { name, email } }) {
      state.user = { name: name || email.split('@')[0], email }
    },
    signOut(state) {
      state.user = null
    },
  },
})

export const { signIn, signOut } = authSlice.actions
export const selectUser = (s) => s.auth.user
export default authSlice.reducer
