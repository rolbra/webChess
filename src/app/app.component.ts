import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PositionerService } from './positioner.service';



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

  private positions: Object;
  private positioner: PositionerService;

  constructor( positioner: PositionerService ){
    let arraySize = 8;
    for(let col = 0; col < arraySize; col++){
      this.cellArray[col] = [];
      for(let row = 0; row < arraySize; row++){
        this.cellArray[col][row] = '';
      }
    }

    this.positioner = positioner;
    this.positions = this.positioner.getPositions();
  }

  ngOnInit(): void {
    this.takeoverPositions(this.positions);
  }

  takeoverPositions(positions: Object){
    let positionString = JSON.stringify(positions);
    
    type parsedType = {
      figure: string,
      x: number,
      y: number,
      code: string
    }

    const parsedStr = JSON.parse(positionString) as parsedType[];

    //console.log(parsedStr);
    parsedStr.forEach(figure => {
      this.cellArray[figure.x][figure.y] = figure.code;
    });
  }
}
