import { Component, OnInit, ViewChild} from '@angular/core';
import {SignupFormInterface} from '../../../FormInterface'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['email','firstName','lastName','website','aboutUs','gender','smartWork','fastLearning','college','date','action'];
  dataSource: MatTableDataSource<SignupFormInterface>;
  resultsLength=0;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor() { 
    this.dataSource = new MatTableDataSource(this.usersData()||[]);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    
  }
  usersData(){
    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      const users:SignupFormInterface[]= JSON.parse(usersString);
    console.log(users);
    if(users!==null){
      console.log(users);
      //this.users.push(...users);
      this.resultsLength=users.length;
      return users;
     }
     return null
  }
  return null;
  }
  onDelete(email: string){
    console.log('delete',email);
    //this.users= this.users.filter((user:SignupFormInterface) => user.email != email);
    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      const users:SignupFormInterface[]= JSON.parse(usersString);
    console.log(users);
    if(users!==null){
      console.log(users);
      let filteredUsers:SignupFormInterface[]= users.filter((user:SignupFormInterface) => user.email.toLowerCase() != email.toLowerCase());
      localStorage.setItem('users',JSON.stringify(filteredUsers));
      this.dataSource = new MatTableDataSource(filteredUsers);

     }
  }
  }

}
