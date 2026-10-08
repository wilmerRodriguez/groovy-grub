import { createSlice, nanoid } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { toasts: [] },
  reducers: {
    pushToast: {
      reducer(state, { payload }) {
        state.toasts.push(payload)
        if (state.toasts.length > 3) state.toasts.shift()
      },
      prepare(message, tone = 'ok') {
        return { payload: { id: nanoid(), message, tone } }
      },
    },
    dismissToast(state, { payload: id }) {
      state.toasts = state.toasts.filter((t) => t.id !== id)
    },
  },
})

export const { pushToast, dismissToast } = uiSlice.actions
export default uiSlice.reducer
