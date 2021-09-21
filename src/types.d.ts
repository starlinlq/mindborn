type Login = {
  username: string;
  password: string;
};

type NotificationType = {
  createdAt: string;
  is_read: boolean;
  notification: string;
  reciever: string;
  sender: { _id: string; username: string; photourl: string };
  type: string;
  belongsTo: string;
};
