import { Socket } from 'socket.io';
import { SocketEvents } from '../utils/enums';

// any new incoming client connection
export const onClientConnection = (socket: Socket) => {
  console.log('New socket connection. Id:', socket.id);
};
