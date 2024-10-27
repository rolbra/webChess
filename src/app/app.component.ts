import { Component } from '@angular/core';
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

  private reply!: Object;

  private firstSelected: boolean = false;
  private secondSelected: boolean = false;

  private moveFrom!: any;
  private moveTo!: any;

  constructor( positioner: PositionerService ){
    //initialize empty array for chess board
    this.resetPositions();

    this.positioner = positioner;
  }

  resetPositions(){
    let arraySize = 8;
    for(let col = 0; col < arraySize; col++){
      this.cellArray[col] = [];
      for(let row = 0; row < arraySize; row++){
        this.cellArray[col][row] = '';
      }
    }
  }

  takeoverPositions(positions: Object){
    this.resetPositions();
    
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
        if(figure.x < 0 || figure.x > 7 || figure.y < 0 || figure.y > 7){
          console.log(figure.figure + ' is out of range');
        }
        else if(!figure.x || !figure.y){
          console.log(figure.figure + ' invalid position');
        }
        else{
          this.cellArray[figure.x][figure.y] = figure.code;
        }
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
      this.moveFrom = event.target;
      event.target.style.borderColor = 'chocolate';
      this.firstSelected = true;
    }
    else if( !this.secondSelected ){
      this.moveTo = event.target;
      event.target.style.borderColor = 'chocolate';
      this.secondSelected = true;
    }
  }

  public onKeydown(event: KeyboardEvent){
    let message = 'key pressed: ';
    console.warn(message + event.key);
  }

  public setFigures(){
    this.positioner.getPositionsFromServer().subscribe( respsonse => {
      this.positions = respsonse;
      console.log(this.positions);
      this.takeoverPositions(this.positions);
    });
  }

  public move(){
    this.firstSelected = false;
    this.secondSelected = false;
    this.moveFrom.style.borderColor = 'wheat';
    this.moveTo.style.borderColor = 'wheat';
    
    this.positioner.move(this.moveFrom.id, this.moveTo.id).subscribe( respsonse => {
      this.reply = respsonse;
      console.log(this.reply);
    });

    this.setFigures();
  }

  public resetGame(){
    console.log('reset game');
    this.positioner.resetGame().subscribe( respsonse => {
      this.reply = respsonse;
      console.log(this.reply);
    });

    this.setFigures();
  }
}
