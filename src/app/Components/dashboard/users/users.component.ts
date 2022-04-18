import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService,User } from '../../../shared/crud.service';
import {SignupFormInterface} from '../../../FormInterface'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface UserInterface{
  id: Number,
  name: String
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id','name'];
  dataSource: MatTableDataSource<User>;
  resultsLength=0;
  Users: any = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(public crudService: CrudService) { 
    this.dataSource = new MatTableDataSource(this.Users);
  }
 
  ngOnInit(): void {
   this.fetchUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetchUsers() {
    return this.crudService.getUsers().subscribe((res: User[]) => {
       console.log('RESPONSE IS ', res);
       //this.Users.push([...res]);
       this.dataSource = new MatTableDataSource(res);
    });
  }

}




