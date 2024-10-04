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

export class AppComponent{

  title = 'webChess';
  public cellArray: string[][] = [];

  private positions!: Object;
  private positioner: PositionerService;

  private firstSelected: boolean = false;
  private secondSelected: boolean = false;

  constructor( positioner: PositionerService ){
    //initialize empty array for chess board
    let arraySize = 8;
    for(let col = 0; col < arraySize; col++){
      this.cellArray[col] = [];
      for(let row = 0; row < arraySize; row++){
        this.cellArray[col][row] = '';
      }
    }

    this.positioner = positioner;

    this.positioner.getPositionsFromServer().subscribe( respsonse => {
      this.positions = respsonse;
      console.log(this.positions);
      this.takeoverPositions(this.positions);
    });
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

    try{
      parsedStr.forEach(figure => {
        this.cellArray[figure.x][figure.y] = figure.code;
      });
    }
    catch(error){
      console.warn("unexpected response from server for 'positions'");
    }
  }

  public onClick(event: any){
    if( !event.target.id ){
      return;
    }
    console.warn( 'board clicked: ', event.target.id);

    if( !this.firstSelected ){
      event.target.style.borderColor = 'chocolate';
      this.firstSelected = true;
    }
    else if( !this.secondSelected ){
      event.target.style.borderColor = 'chocolate';
      this.secondSelected = true;
    }
  }
}
