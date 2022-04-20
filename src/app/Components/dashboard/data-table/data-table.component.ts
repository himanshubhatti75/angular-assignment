import { Component, OnInit, ViewChild} from '@angular/core';
import {SignupFormInterface} from '../../../FormInterface'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PopupComponent } from '../../common/popup/popup.component';
import {MatDialog} from '@angular/material/dialog';
import {LiveAnnouncer} from '@angular/cdk/a11y';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['img','email','firstName','lastName','website','aboutUs','gender','smartWork','fastLearning','college','date','action'];
  dataSource: MatTableDataSource<SignupFormInterface>;
  resultsLength=0;
  loginUser:any;
  count=0;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private dialogRef: MatDialog,private _liveAnnouncer: LiveAnnouncer) { 
    this.dataSource = new MatTableDataSource(this.usersData()||[]);
    const data=localStorage.getItem('user-auth');
    if(typeof data==='string'){
      this.loginUser=JSON.parse(data);
    }

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
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  openDialog(email: string){
    const dialog=this.dialogRef.open(PopupComponent,{
      data: {
        title: "Delete action ",
        message: "Sure, you want to delethe the user"
      }
    });

    return dialog.afterClosed().subscribe((result:any)=>{
      if(result==="true"){
        this.onDeleteAction(email);
      }
    })

  }
  ngOnInit(): void {
    
  }

  usersData(){
    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      const users:SignupFormInterface[]= JSON.parse(usersString);
    if(users!==null){
      this.resultsLength=users.length;
      return users;
     }
     return null
  }
  return null;
  }

  onDeleteAction(email: string){
    const usersString=localStorage.getItem('users');
    if(usersString!==null){
      const users:SignupFormInterface[]= JSON.parse(usersString);
    if(users!==null){
      let filteredUsers:SignupFormInterface[]= users.filter((user:SignupFormInterface) => user.email.toLowerCase() != email.toLowerCase());
      localStorage.setItem('users',JSON.stringify(filteredUsers));
      this.dataSource = new MatTableDataSource(filteredUsers);
      this.resultsLength--;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     }
  }
  }

  onDelete(email: string){
    this.openDialog(email);
  }

  adminRow(row:any){
    if(row.email===this.loginUser.email)
    {
      return true;
    }
    return false;
  }


}
