import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // socketId -> userId

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove user from connected users map
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @MessageBody() data: { room: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room);
    this.connectedUsers.set(data.userId, client.id);
    client.emit('joined_room', { room: data.room });
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.room);
    client.emit('left_room', { room: data.room });
  }

  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody() data: { room: string; message: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast message to all clients in the room
    this.server.to(data.room).emit('new_message', {
      message: data.message,
      userId: data.userId,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('user_typing')
  handleUserTyping(
    @MessageBody() data: { room: string; userId: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.room).emit('user_typing', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }

  // Method to send notification to specific user
  sendNotificationToUser(userId: string, notification: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', notification);
    }
  }

  // Method to broadcast to all connected users
  broadcastToAll(event: string, data: any) {
    this.server.emit(event, data);
  }
}
