import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ContextMenuModel } from "../../Interfaces/context-menu-model";

@Component({
  selector: 'mindmapp-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  selectedItem:number;

  @Input()
  contextMenuItems: Array<ContextMenuModel>;

  @Output()
  onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onChangeInSelectedItem: EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
    console.log("Context Menu Constructor");
  }

  ngOnInit(): void {
    this.selectedItem=0;
    console.log("Context Menu OnInit");
  }

  ngOnDestroy() {
    console.log("Context Menu Destroyed");
  }

  onContextMenuClick(event, data): any {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }

  emitSeletction(){
    this.onChangeInSelectedItem.emit(this.selectedItem)
  }

  keyHandler(e){
    console.log("Event inside the context menu")
    console.log(e); // appending the updated value to the variable
    switch(e.key){
      case("ArrowDown"):
      this.selectedItem = this.selectedItem === this.contextMenuItems.length-1? 0 : this.selectedItem + 1;  
      this.emitSeletction()
      break;

      case("ArrowUp"):
      this.selectedItem = this.selectedItem === 0? this.contextMenuItems.length-1 : this.selectedItem - 1;  
      break;

      case("Enter"):
      console.log(this.onContextMenuClick)
      this.onContextMenuClick(e,this.contextMenuItems[this.selectedItem].menuEvent)
      break;

    }
    }
  

  


}
