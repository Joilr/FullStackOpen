import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification(state, action) {
        return action.payload
      }
    }
  })

  export const { createNotification } = notificationSlice.actions

  let notificationTimer = null

  export const setNotification = (content, time) => (dispatch) => {

    if (notificationTimer) {
      clearTimeout(notificationTimer)
    }
  
    dispatch(createNotification(content))
  
    notificationTimer = setTimeout(() => {
      dispatch(createNotification(initialState))
      notificationTimer = null 
    }, time * 1000)
  }
  
  export default notificationSlice.reducer