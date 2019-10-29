import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

constructor(public afAuth: AngularFireAuth,public afStore:AngularFirestore){}
doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    })
  })
}
doRegister(email,password){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(email,password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
 }

 doLogin(email,password){
   return new Promise<any>((resolve,reject)=>{
     firebase.auth().signInWithEmailAndPassword(email,password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
 }

 doLogout(){
   return new Promise<any>((resolve,reject)=>{
     firebase.auth().signOut()
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
 }
 loadSchedule(){
   return this.afStore.collection("/schedule").valueChanges().pipe(tap(console.log))
   
 }
}

let data={
  user:[
    {
      username:"Shubham Gogate",
      email:"gogateshubham@gmail.com",
      dob:new Date().setFullYear(1999,5,5),
      gender:"M",
      schedule:[
        {
          date:"17/05/2047",
          time:[
            {
              name:"Breakfast",
              items:[
                {
                  time:"08:00",
                  title:"",
                  diet:""
                }
              ]
            },
            {
              name:"Lunch"
            },
            {
              name:"Evening"
            },
            {
              name:"Dinner"
            }
          ]
        }
      ]
    },
    {
      username:"Yash Gandhi",
      email:"yash.gandhi@spit.ac.in",
      dob:new Date().setFullYear(1999,11,29).toLocaleString(),
      gender:"M"
    },
    {
      username:"Jaynil Gaglani",
      email:"g.jaynil@gmail.com",
      dob:new Date().setFullYear(2000,1,19).toLocaleString(),
      gender:"M"
    },
    {
      username:"Sudhanshu Chavan",
      email:"sudhanshu.chavan@spit.ac.in",
      dob:new Date().setFullYear(1999,12,21).toLocaleString(),
      gender:"M"
    }
  ],

}