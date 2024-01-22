import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'visibleNotification':
            return action.payload
        case 'invisibleNotification':
            return ''
        default:
            return state
    }   
}

const NotificationContext = createContext('')

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
        let timer
        if (notification && notification.duration) {
            timer = setTimeout(() => {
                notificationDispatch({ type: 'invisibleNotification' })
            }, notification.duration * 1000)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [notification])

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext