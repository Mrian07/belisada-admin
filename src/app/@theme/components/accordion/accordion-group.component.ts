import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'group',
  template: `
  <div class="accordion">
    <div class="accordion__header" (click)="toggle.emit()">
      <div class="row">
        <div class="col-sm-12">
            <div>{{ data.createdTime }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
            <div>Payment ID:  {{ data.paymentNumber }}</div>
        </div>
        <div class="col-sm-3">
            <div>Payment: <span>{{ data.paymentMethod }}</span></div>
        </div>
        <div class="col-sm-3">
            <div>Sumber Dana: <span>{{ data.bankAccount }}</span></div>
        </div>
        <div class="col-sm-3">
            <div class="text-right"><span>{{ data.status }}</span></div>
        </div>
      </div>
    </div>
    <div class="accordion__body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['accordion.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionGroupComponent {

  /**
   * If the panel is opened or closed
   */
  @Input() opened = false;

  /**
   * Text to display in the group title bar
   */
  @Input() title: string;

  /**
   * Data displayed in header
   */
  @Input() data: any;

  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
