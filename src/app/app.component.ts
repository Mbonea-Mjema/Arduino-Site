import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MqttService } from "./services/mqtt.service";
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  
  connected=false
  Digital:object
  keys:any[]=[]
  A0:number=5
  Answer:number=0
  Dummy;
  counter:number=0
  Analog:number[]=[]
  Formula= new FormControl("")
  host = new FormControl('ws://iot.eclipse.org:80/ws');
  Topic= new FormControl('Lab/Arduino');
constructor(public mqtt:MqttService,public toastr: ToastrManager) {
}

  




  ngOnInit(){
    this.Dummy=this.A0
    setInterval(() => {
      if(this.mqtt.Client){
      
      this.connected=this.mqtt.Client.connected
      }


    }, 100);
  }
 Subscribe(){
  this.mqtt.subscribe(this);
}


 Disconnect(){

  this.mqtt.Client.end([true])
  this.toastr.warningToastr('Disconnected','Alert!')
  this.connected=this.mqtt.Client.connected
 }

 Calculate(){
 let value = this.Dummy
 if(this.Formula.value=="value")
 {
   ///this.Formula.value=this.A0.toString()
 }
 if(this.Formula.value=="ans")
 {
 //  this.Formula.value=this.Answer.toString()
 }
 

 let answer=eval(this.Formula.value) 
this.Dummy=answer
this.Answer=answer
 }
 checkClicked(state,item){
  this.Digital[item]=state
  console.log(this.Digital)
 }
}