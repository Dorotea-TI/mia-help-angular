import { BaseColumnComponent } from '@doroteati/mia-table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-helpful-column',
  templateUrl: './helpful-column.component.html',
  styleUrls: ['./helpful-column.component.css'],
})
export class HelpfulColumnComponent
  extends BaseColumnComponent
  implements OnInit
{
  ngOnInit(): void {}

  getTotal() {
    return this.item.likes + this.item.dislikes;
  }
}
