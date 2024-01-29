import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  if (notification === '') {
    return null;
  }

  if (notification.includes('error') || notification.includes('wrong')) {
    return <div className="showMsg-red">{notification}</div>;
  } else {
    return <div className="showMsg-green">{notification}</div>;
  }
};

export default Notification;
