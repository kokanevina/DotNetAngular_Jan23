import { Component } from '@angular/core';
import { MathsService } from '../myservices/maths.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent {
  counter2=this.mathService.getCounter();
  constructor(private mathService:MathsService){

  }

  getCount(){
    this.mathService.incrementCounter();
    this.counter2=this.mathService.getCounter();
  }
}
