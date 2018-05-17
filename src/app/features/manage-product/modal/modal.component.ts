import { Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
   if(event.key === "Escape"){
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  }
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscription: Subscription;
  constructor() { }

  ngOnInit() {

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  onKeydown(event) {
    if(event.key === "Escape"){
      this.visible = false;
      this.visibleChange.emit(this.visible);
    }
    
    
  }

}
