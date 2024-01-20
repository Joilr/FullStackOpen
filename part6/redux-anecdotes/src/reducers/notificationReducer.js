import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification(state, action) {
        return action.payload
      },
      clearNotification() {
        return initialState
      }
    }
  })

  export const { createNotification, clearNotification } = notificationSlice.actions
  export default notificationSlice.reducer