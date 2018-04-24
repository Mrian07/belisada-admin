import { Component } from '@angular/core';
// import { FilterPipe } from '../../../@theme/pipes/filter.pipe';

@Component({
  selector: 'store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent {
  collapsed1: boolean = false;
  Approval: boolean;
  cCharacters: string = 'wahyu';
  approved: string = 'Approved';
  needApproved: string = 'Need Approval';
  characters = [];
  private posts: Post
  private rowSelected: number
  constructor() {
    this.rowSelected = -1;
    let obj = new Post(1, '2017-12-11', this.cCharacters, 'Wahyu' , this.approved, '-', [this.cCharacters]);
    this.characters.push(obj);
    obj = new Post(2, '2017-12-11', 'bla bla', 'oke oce123', this.needApproved, '-', ['dassdfsds', 'dsdfds']);
    this.characters.push(obj);

    //  obj = new Post(3, '2017-12-11', 'bla bla', 2,['dassdfsds','dsdfds'])
    // this.posts.push(obj)
  }


  getCharacter(id) {
    this.cCharacters = id.nam;
    console.log(this.cCharacters);
  }

  ngOnInit() {
    this.collapsed1;
    console.log(this.collapsed1);
  }
  onApprove() {
    this.Approval = true;
    console.log('Untuk mengganti approval', this.Approval);
  }
  public openCloseRow(idReserva: number): void {

    if (this.rowSelected === -1) {
      this.rowSelected = idReserva
    } else {
      if (this.rowSelected == idReserva) {
        this.rowSelected = -1
      } else {
        this.rowSelected = idReserva
      }

    }
  }

}

export class Post {
  constructor(

    public id: number,
    public date: string,
    public nam: string, // nama toko
    public subject: string, // nama pemilik
    public numComents: string, // status
    public approvedBy: string, // approved by
    public comments: string[]
  ) {}
}