import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../classes/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCRUDService {
  backendlink="http://localhost:3000/employees";
  constructor(private httpService:HttpClient) {

   }
   addEmployee(emp:Employee){
        return this.httpService.post("http://localhost:3000/employees",emp); // json object
   }
   getAllEmployees(){
      return this.httpService.get("http://localhost:3000/employees");
   }
   deleteEmployee(eid:number){
      console.log(eid);
      
      return this.httpService.delete(`http://localhost:3000/employees/${eid}`);
   }
}
