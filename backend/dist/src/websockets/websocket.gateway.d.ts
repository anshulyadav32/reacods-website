import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(data: {
        room: string;
        userId: string;
    }, client: Socket): void;
    handleLeaveRoom(data: {
        room: string;
    }, client: Socket): void;
    handleMessage(data: {
        room: string;
        message: string;
        userId: string;
    }, client: Socket): void;
    handleUserTyping(data: {
        room: string;
        userId: string;
        isTyping: boolean;
    }, client: Socket): void;
    sendNotificationToUser(userId: string, notification: any): void;
    broadcastToAll(event: string, data: any): void;
}
