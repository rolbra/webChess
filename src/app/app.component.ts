import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//incomming positions
const positions = [
  {
    'figure': 'rook_blk_0',
    'x': 0,
    'y': 7,
    'code': '&#x265C;'
  },
  {
    'figure': 'knight_blk_0',
    'x': 1,
    'y': 7,
    'code': '&#x265E;'
  },
  {
    'figure': 'bishop_blk_0',
    'x': 2,
    'y': 7,
    'code': '&#x265D;'
  },
  {
    'figure': 'queen_blk',
    'x': 3,
    'y': 7,
    'code': '&#x265B;'
  },
  {
    'figure': 'king_blk',
    'x': 4,
    'y': 7,
    'code': '&#x265A;'
  },
  {
    'figure': 'bishop_blk_1',
    'x': 5,
    'y': 7,
    'code': '&#x265D;'
  },
  {
    'figure': 'knight_blk_1',
    'x': 6,
    'y': 7,
    'code': '&#x265E;'
  },
  {
    'figure': 'rook_blk_1',
    'x': 7,
    'y': 7,
    'code': '&#x265C;'
  },
  {
    'figure': 'pawn_blk_0',
    'x': 0,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_1',
    'x': 1,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_2',
    'x': 2,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_3',
    'x': 3,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_4',
    'x': 4,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_5',
    'x': 5,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_6',
    'x': 6,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'pawn_blk_7',
    'x': 7,
    'y': 6,
    'code': '&#x265F;'
  },
  {
    'figure': 'rook_white_0',
    'x': 0,
    'y': 0,
    'code': '&#x2656;'
  },
  {
    'figure': 'knight_white_0',
    'x': 1,
    'y': 0,
    'code': '&#x2658;'
  },
  {
    'figure': 'bishop_white_0',
    'x': 2,
    'y': 0,
    'code': '&#x2657;'
  },
  {
    'figure': 'queen_white',
    'x': 3,
    'y': 0,
    'code': '&#x2655;'
  },
  {
    'figure': 'king_white',
    'x': 4,
    'y': 0,
    'code': '&#x2654;'
  },
  {
    'figure': 'bishop_white_1',
    'x': 5,
    'y': 0,
    'code': '&#x2657;'
  },
  {
    'figure': 'knight_white_1',
    'x': 6,
    'y': 0,
    'code': '&#x2658;'
  },
  {
    'figure': 'rook_white_0',
    'x': 7,
    'y': 0,
    'code': '&#x2656;'
  },
  {
    'figure': 'pawn_white_0',
    'x': 0,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_1',
    'x': 1,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_2',
    'x': 2,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_3',
    'x': 3,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_4',
    'x': 4,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_5',
    'x': 5,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_6',
    'x': 6,
    'y': 1,
    'code': '&#x2659;'
  },
  {
    'figure': 'pawn_white_7',
    'x': 7,
    'y': 1,
    'code': '&#x2659;'
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'webChess';
  public cellArray: string[][] = [];

  constructor(){
    let arraySize = 8;
    for(let col = 0; col < arraySize; col++){
      this.cellArray[col] = [];
      for(let row = 0; row < arraySize; row++){
        this.cellArray[col][row] = '';
      }
    }
  }

  ngOnInit(): void {
    this.takeoverPositions();
  }

  takeoverPositions(){
    positions.forEach(item => {
      if(item.code && item.figure){
        this.cellArray[item.x][item.y] = item.code;
        //console.warn( item.figure + ' added: ' + item.x + ', ' + item.y);
      }
      else{
        console.warn('invalid figure object: ' + item.figure);
      }
    });
  }
}
