import { Component } from '@angular/core';
import { Department } from '../classes/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
title="Employee Management System";
 deptArray=new Array<Department>();
 deparment=new Department("LD","Learning and Development",100000,2015, "https://picsum.photos/id/560/200/300");
 constructor(){
  this.deptArray=[
    new Department("LD","Learning and Development",100000,2015, "https://picsum.photos/id/560/200/300"),
    new Department("JW","Java Web",400000,2000,  "https://picsum.photos/id/564/200/300"),
    new Department("DN","Dot Net",500000,2000,  "https://picsum.photos/id/562/200/300")
 ];
 }
 display():void{
      console.log(this.deparment);
      
 }
}