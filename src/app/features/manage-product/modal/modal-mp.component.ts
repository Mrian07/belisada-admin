import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'modal-mp',
  templateUrl: './modal-mp.component.html',
  styleUrls: ['./modal-mp.component.scss'],
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
export class ModalMPComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() maxwidth: number;
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
