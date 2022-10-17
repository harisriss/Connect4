import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {

  @Input() infos?: string;
  @Input() position: { x: number, y: number };
  @Input() player?: number;
  @Output() isClicked = new EventEmitter<number>();
  clicked = false;

  constructor() {
    this.position = {x: -1, y: -1};
  }

  ngOnInit(): void {
  }


  playerSelected() {
    return {
      empty: this.player == 0,
      red: this.player == 1,
      yellow: this.player == 2,
    };
  }


  cellClicked(): void {
    this.isClicked.emit(this.position.y);
    this.clicked = true;

  }
}
