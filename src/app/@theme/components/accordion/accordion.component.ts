import { Component, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group.component';

@Component({
  selector: 'accordion',
  template: `
    <ng-content></ng-content>
`,
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent  implements AfterContentInit {
  @ContentChildren(AccordionGroupComponent) 
  groups: QueryList<AccordionGroupComponent>;

  /**
   * Invoked when all children (groups) are ready
   */
  ngAfterContentInit() {
    console.log ('this.groups: ', this.groups);

    this.groups.changes.subscribe(groups => {
      // Set active to first element
      // this.groups.toArray()[0].opened = true;
      // Loop through all Groups
      groups.toArray().forEach((t) => {
        // when title bar is clicked
        // (toggle is an @output event of Group)
        t.toggle.subscribe(() => {
          // Open the group
          this.openGroup(t);
        });
        /*t.toggle.subscribe((group) => {
          // Open the group
          this.openGroup(group);
        });*/
      });
    });

  }

  /**
   * Open an accordion group
   * @param group   Group instance
   */
  openGroup(group: any) {
    // close other groups
    this.groups.toArray().forEach((t) => t.opened = false);
    // open current group
    group.opened = true;
  }
}
