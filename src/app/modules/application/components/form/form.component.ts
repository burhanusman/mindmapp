import { Component, OnInit,HostListener } from '@angular/core';
import {MmpService} from '../../../../core/services/mmp/mmp.service'
import {ContextMenuModel} from '../../Interfaces/context-menu-model'

@Component({
  selector: 'mindmapp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  a=[];
  nodename:string;
  model:string;
  nodeIds;
  selectedNodeId;
  text:string='';


  //Context Ment stuff
  isDisplayContextMenu: boolean;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;


  constructor(public mmpService: MmpService) { 
  }

  ngOnInit(): void {
  }

  addNode(){
    this.mmpService.selectNode(this.selectedNodeId);
    this.mmpService.addNode({'name':this.nodename})
    this.nodename=''
    this.nodeIds=this.mmpService.nodeChildren();
    console.log(this.selectedNodeId);
  }

  changeNode(i){
    let item=this.getAllNodes()[i];
    this.mmpService.selectNode(item);
  }
  
  clickTest(){
    this.mmpService.selectNode(this.selectedNodeId);
  }

  
  onKeyUp(x) { // appending the updated value to the variable
    if (!this.isDisplayContextMenu){
      if (x.key == '/'){
        console.log(this.getCaretCoordinates());
        console.log(this.nodename);
        this.text += x.target.value + ' | ';
        this.nodename='';
        this.displayContextMenu(x);
      }
      else{
        this.mmpService.updateNode('name',this.nodename);
      }
    }
    else{
      console.log("Display context menu true")
      switch(x.key){
        case("ArrowDown"):

      }
    }
    

    
    
  }

  getMenuItems(){
    return this.getAllNodes().map((x)=>({menuText: x,
      menuEvent: x}));

  }

  //Contect Menu Functions 
  displayContextMenu(event) {
    this.isDisplayContextMenu = true;
    this.rightClickMenuItems = this.getMenuItems();
    const { x, y } = this.getCaretCoordinates();
    this.rightClickMenuPositionX = x;
    this.rightClickMenuPositionY = y;

  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event) {
    this.isDisplayContextMenu = false;
    this.mmpService.selectNode(event.data);
    this.mmpService.addNode({'name':''})
    this.nodename=''
    this.nodeIds=this.mmpService.nodeChildren();
    this.mmpService.selectNode(this.nodeIds[this.nodeIds.length-1].id);
  }
  
  iterate(root){
    let children=this.mmpService.nodeChildren(root);
    if (children.length===0){
      this.a.push(root);
    return 
    }
    else{
      this.a.push(root);
      children.forEach((x)=>this.iterate(x.id));
    }
  }   

  getAllNodes(){
    this.a=[];
    this.iterate('map_1_node_0');
    return this.a;
  }

  getCaretCoordinates = () => {
    let x, y;
    const selection = window.getSelection();
    console.log(selection);
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      console.log(range);
      range.collapse(false);
      console.log(range);
      const rect = range.getClientRects()[0];
      console.log(rect);
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
    return { x, y };
  };

  keyDownHandler(e){
    console.log("Key down handler");
    switch (e.key) {
      case 'Enter':
        console.log("Q pressed")
  }};

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
    console.log("Removing Event Listner")

  }


  
}
