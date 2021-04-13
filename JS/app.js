'use strict';


let form = document.getElementById('myForm');
let table = document.getElementById('myTable');
let totalDiv = document.getElementById('total');

let counter=0;

function Employee(name, email, department)
{
  this.name = name;
  this.email = email;
  this.department= department;
  this.salary= this.random(100,500);

  Employee.all.push(this);

}

Employee.all =[];




Employee.prototype.random = function(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};




Employee.prototype.settingLS = function(){
  localStorage.setItem('employee', JSON.stringify(Employee.all));
};





form.addEventListener('submit', eventHandler);


function eventHandler(event){

  event.preventDefault();

  let name = event.target.Name.value;
  let email = event.target.Email.value;
  let departement = event.target.Department.value;



  let newEmployee = new Employee(name,email,departement);
  newEmployee.settingLS();
  counter++;

  // console.log(Employee.all);



  tableRender ();
  salaryTotal();

}










function tableHeader(){
  let tableHeadRow = document.createElement('tr');
  table.appendChild(tableHeadRow);

  let tableHeadCell1 = document.createElement('th');
  tableHeadRow.appendChild(tableHeadCell1);
  tableHeadCell1.textContent = 'Name';

  let tableHeadCell2 = document.createElement('th');
  tableHeadRow.appendChild(tableHeadCell2);
  tableHeadCell2.textContent = 'Email';

  let tableHeadCell3 = document.createElement('th');
  tableHeadRow.appendChild(tableHeadCell3);
  tableHeadCell3.textContent = 'Department';

  let tableHeadCell4 = document.createElement('th');
  tableHeadRow.appendChild(tableHeadCell4);
  tableHeadCell4.textContent = 'Salary';

}


function tableRender (){

  if (localStorage.employee){
    Employee.all = JSON.parse( localStorage.getItem('employee'));
  }else{

    Employee.all= [];
  }

  table.innerHTML= '';
  tableHeader();
  for(let i= 0; i< Employee.all.length; i++){
    let tableRow = document.createElement('tr');
    table.appendChild(tableRow);


    let tableDataCell1 = document.createElement('td');
    tableRow.appendChild(tableDataCell1);
    tableDataCell1.textContent = Employee.all[i].name;

    let tableDataCell2 = document.createElement('td');
    tableRow.appendChild(tableDataCell2);
    tableDataCell2.textContent = Employee.all[i].email;

    let tableDataCell3 = document.createElement('td');
    tableRow.appendChild(tableDataCell3);
    tableDataCell3.textContent = Employee.all[i].department;


    let tableDataCell4 = document.createElement('td');
    tableRow.appendChild(tableDataCell4);
    tableDataCell4.textContent = Employee.all[i].salary;

  
  }
 
}

tableRender ();

function salaryTotal(){
  let total = document.createElement('p');
  totalDiv.appendChild(total);
  total.textContent = `Total =  ${counter}`;
}
