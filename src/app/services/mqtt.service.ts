import { Injectable } from '@angular/core';
import * as mqtt from '../../vendor/mqtt'

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  Client:any=false;
  audio= new Audio("https://github.com/Mbonea-Mjema/website-resources/raw/master/Documents/html/iphone_glass_single.mp3")
  connect_sound = new Audio('https://github.com/Mbonea-Mjema/website-resources/raw/master/Documents/html/ios_7_charging_sound.mp3')
  connected:boolean
  
  constructor() {
  this.audio.load();
  this.connect_sound.load();
  }
subscribe(rootObj)
{
  this.Client  = mqtt.connect(rootObj.host.value)
  this.connected=this.Client.connected
  console.log(this.Client.connected)
 console.log(this.Client.reconnecting)
  this.Client.subscribe(rootObj.Topic.value, function (err) {
    if (err) {
      console.log('not connetced')
    }
  })
  var temp=[];

  rootObj.Digital=temp
  this.Client.on('connect',()=>{
  rootObj.connected=this.Client.connected
  
  rootObj.toastr.successToastr('Connected to '+rootObj.host.value, 'Connected!');
  this.connect_sound.play()
  rootObj.counter=0
  })

  this.Client.on('error',(error)=>{
    rootObj.toastr.errorToastr('Error '+error, 'Oops!');
    this.Client.reconnecting=false
    //console.error('we got an error')
  })
  this.Client.on('offline',()=>{
    if(rootObj.counter==0)
    {
    rootObj.toastr.errorToastr('You are offline' , 'Oops!');
    console.log(this)
    
    }
    rootObj.counter++
    //console.error('we got an error')
  })
  function setMe(data){
rootObj.Digital=data
  }
  this.Client.on('message', (topic, message)=> {
    //console.log(rootObj.Digital)
    var obj = JSON.parse(message.toString());
   rootObj.toastr.infoToastr('MQTT Message', 'Message Received')
   this.audio.play();
    temp= obj['arduino_lab']['Digital']
    var keys = Object.keys(temp)
    keys.map((x)=>{
      //console.log(temp[x])
      if(temp[x]==1){
        temp[x]=true
      }else{
      temp[x]=false
     } })
      //console.log(temp)
      rootObj.keys=keys
      rootObj.Digital=temp
      //console.log(rootObj)
     // rootObj.Digital=temp
      //console.log(rootObj.Digital)
     // return setMe(temp)
  })

}  
}
