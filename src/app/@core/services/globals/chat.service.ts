import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import Socket = SocketIOClient.Socket;
import { LocalStorageEnum } from '../../../@core/enum/local-storage.enum';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChatRoom } from '../../models/chat/chat-room.model';
import { ChatMessage } from '../../models/chat/chat-message.model';

import { Globals } from '../../services/globals/globals';
import { environment } from 'environments/environment';
import { JoinRoom } from '../../../@core/interfaces/join-room.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor(private http: HttpClient, private globals: Globals) {}

  connectSocket(): Socket {
    console.log('environment.socketUrl: ', environment.socketUrl);
    this.socket = io(environment.socketUrl + '/rooms',
      {query: { token: localStorage.getItem(LocalStorageEnum.TOKEN_KEY) }});
    return this.socket;
  }

  getMyChatRooms(id): Observable<ChatRoom[]>  {
    return this.http.get(environment.chatUrl + '/api/rooms' , {params: {userId: id}})
      .pipe(
        map(response => response as ChatRoom[])
      );
  }

  joinRoom(joinRoom: JoinRoom) {
    this.socket.emit('join', joinRoom);
  }

  sendMessage(message: ChatMessage, room: string) {
    const data = {
      message: message,
      room: room
    };
    this.socket.emit('message', data);
  }

  show() {
    this.globals.showChat = true;
  }

  hide() {
    this.globals.showChat = false;
  }

  setStoreId(storeId: number) {
    this.globals.storeId = storeId;
  }

  getStoreId() {
    return this.globals.storeId;
  }
}
