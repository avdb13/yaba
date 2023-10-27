import { useAppSelector as useSelector } from "../app/hooks";

const Notification = () => {
  const notification: Notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const style = (color: string) => `bg-${color}-100 border-l-4 border-${color}-500 text-${color}-500 p-4`;

  switch (notification.type) {
  case "error":
    return <div className={style("red")}>
      <p>{notification.content}</p>
    </div>;
  case "warning":
    return <div className={style("orange")}>
      <p>{notification.content}</p>
    </div>;
  case "message":
    return <div className={style("green")}>
      <p>{notification.content}</p>
    </div>;

  }
};

export default Notification;
