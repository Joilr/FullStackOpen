import { useNotificationValue } from '../notificationContext'

const Notification = () => {

  const displayedNotification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {displayedNotification.message}
    </div>
  )
}

export default Notification
