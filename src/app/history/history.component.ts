import { Component, OnInit } from '@angular/core';
import {ActionService} from "../../service/action.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private service : ActionService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(data=>{
        console.table(data)
      })
  }

}
