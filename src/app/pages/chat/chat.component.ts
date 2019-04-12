import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { UserService, StoreService } from './../../@core/services';
// import { UserData } from './../../@core/models';
import { ChatRoom } from './../../@core/models/chat/chat-room.model';
import { ChatService } from './../../@core/services/globals/chat.service';
import { ChatMessage } from './../../@core/models/chat/chat-message.model';

import Socket = SocketIOClient.Socket;
import { RoomTypeEnum } from './../../@core/enum/room-type.enum';
import { JoinRoom } from './../../@core/interfaces/join-room.interface';
import { Globals } from './../../@core/services/globals/globals';
import { LocalStorageEnum } from './../../@core/enum/local-storage.enum';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messages') private messagesContainer: ElementRef;

  private socket: Socket;

  public chatFormGroup: FormGroup;
  public chatMessages = [];
  public chatRooms: ChatRoom[] = [];
  // public userData: UserData = new UserData;


  selectedRoom: any;

  thumborUrl: string;

  constructor(
    public globals: Globals,
    private chatService: ChatService,
    private fb: FormBuilder,
    // private userService: UserService
  ) {
    this.thumborUrl = environment.thumborUrl + 'unsafe/fit-in/400x400/center/filters:fill(fff)/';
  }

  ngOnInit() {
    // this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));

    this.socket = this.globals.socket;

    // this.chatService.getMyChatRooms(this.userData.userId).subscribe(res => {
    //   this.chatRooms = res.filter(x => this.userData.storeId === +x.unique_identifier.split('~')[1]);
    //   this.selectedRoom = this.chatRooms[0];
    //   const joinRoom = new JoinRoom();
    //   joinRoom.uniqueIdentifier = this.selectedRoom.unique_identifier;
    //   joinRoom.roomType = RoomTypeEnum.BS;
    //   this.chatService.joinRoom(joinRoom);
    // });

    this.socket.on('users', (userIds: string[]) => {
      console.log('--- users ---:userids-> ', userIds);
    });

    this.socket.on('message', (datas: any[]) => {
      console.log('--- message ---:data-> ', datas);
      this.chatMessages = [...this.chatMessages, ...datas];
      this.scrollToBottom();
      console.log('chatMessages: ', this.chatMessages);
    });

    this.createForm();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
}

  createForm() {
    this.chatFormGroup = this.fb.group({
      message: ['', Validators.required],
      room: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  activateRoom(room) {
    this.selectedRoom = room;
    this.chatMessages = [];

    const joinRoom = new JoinRoom();
    joinRoom.uniqueIdentifier = this.selectedRoom.unique_identifier;
    joinRoom.roomType = RoomTypeEnum.BS;

    this.chatService.joinRoom(joinRoom);
  }

  submit() {
    console.log('Submited');
    // this.chatFormGroup.patchValue({
    //   room: this.selectedRoom._id,
    //   userId: this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY)).userId
    // });

    // const message: ChatMessage = new ChatMessage();
    // message.message = this.chatFormGroup.controls['message'].value;
    // message.userId = this.chatFormGroup.controls['userId'].value;
    // message.date = new Date();

    // const room = this.chatFormGroup.controls['room'].value;

    // console.log('message: ', message);
    // console.log('room: ', room);
    // this.chatService.sendMessage(message, room);
    // this.chatFormGroup.controls['message'].reset();
  }

  exit() {
    this.chatService.hide();
  }
}
