import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {DataInterface} from './interfaces/data'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  title:String=""
  message:String=""

  constructor(@Inject(MAT_DIALOG_DATA) public data:DataInterface) { 
    this.title=data.title;
    this.message=data.message;

  }

  ngOnInit(): void {
  }
  onClick(){
    //onClick;
  }
  onNoClick(){
    //onNoClick();
  }


}
