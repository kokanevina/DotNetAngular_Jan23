import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../classes/employee';
import { EmployeeCRUDService } from '../myservices/employee-crud.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  routeParameter:string | null="";
  joinsuccessMessage="";
  myEmployee=new Employee();
  myBorder="green 2px solid";
  passPattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{7,15}$";
  namePattern="^[A-Za-z ]*$";
  registerForm:FormGroup=new FormGroup({});
  updateForm:FormGroup=new FormGroup({});
  employee=new Employee();
  constructor(private empCrud:EmployeeCRUDService, private activeRoute:ActivatedRoute, private router:Router){
    this.registerForm=new FormGroup({
      empName:new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]),
      empSalary:new FormControl("" ,[Validators.required, Validators.min(0)]),
      empGender:new FormControl(""),
      empAddress:new FormControl("",Validators.required),
      departmentId:new FormControl("",Validators.required),
      emailId:new FormControl("",[Validators.required, Validators.email ]),
      password:new FormControl("",[Validators.required, Validators.pattern(this.passPattern) ]), 
      confirmPassword:new FormControl("",[Validators.required]),
    }
    ,this.passwordMatch /* custom validator function registered on FormGroup object */
    );
    
    this.updateForm=new FormGroup({
      empName:new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]),
      empSalary:new FormControl("" ,[Validators.required, Validators.min(0)]),
      empGender:new FormControl(),
      empAddress:new FormControl(this.myEmployee.empAddress,Validators.required),
      departmentId:new FormControl("",Validators.required),
      emailId:new FormControl(""),
      password:new FormControl(""), 
    }
    );
  }
  ngOnInit(): void {
    let eid=0;
    this.routeParameter=this.activeRoute.snapshot.paramMap.get('eid');
    if(this.routeParameter!=null)
      eid=parseInt(this.routeParameter);
    this.empCrud.getEmployeeById(eid).subscribe(
      {
        next:successres=>this.myEmployee=successres as Employee,
        error:errorres=>console.log(errorres)
      }
    );
  }

  get deptId(){
    return this.registerForm.get('departmentId');
   }
  
 get ename(){
  return this.registerForm.get('empName');
 }

 get esalary(){
  return this.registerForm.get('empSalary');
 }

 get eaddress(){
  return this.registerForm.get('empAddress');
 }

 get eemail(){
  return this.registerForm.get('emailId');
 }

 get epass(){
  return this.registerForm.get('password');
 }
 get econfirmpass(){
  return this.registerForm.get('confirmPassword');
 }
  collectData():void{
    this.employee=this.registerForm.value; // id is not taken from form
    console.log("......data posted....");
    this.empCrud.addEmployee(this.employee).subscribe({
      next:successres=>{
        console.log(successres);
        this.joinsuccessMessage=`Hello ${(successres as Employee).empName}, your joining is DONE!!!!!!`
      },
      error:errorres=>console.log(errorres)
    });
  }
 
  private passwordMatch(regForm:AbstractControl)
  {   // special custom validator function
  
     let passNode=regForm.get('password');
     let cPassNode=regForm.get('confirmPassword');
 
      if(passNode?.value==cPassNode?.value)
        return null
      else  
        return {'passMatch':true};
  }
  nodeType="password";
  showP(event:any):void{
      if(event.target.checked)
        this.nodeType="text";
      else
       this.nodeType="password";
  }
  collecUpdatedData(){
    console.log(this.myEmployee); // updated object
    //we will pass updated values to backend
    this.empCrud.updateEmployee(this.myEmployee).subscribe({
      next:successres=>console.log(successres),
      error:errorres=>console.log(errorres)
    });

    this.router.navigate(['/employees']);
  }

  
}

