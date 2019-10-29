import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../firebase.service';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public firebase:FirebaseService
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(email: string,password: string): Promise<any> {
    return this.firebase.doLogin(email,password)
      .then(res => {
        console.log(res);
        this.storage.set(this.HAS_LOGGED_IN, true);
          this.setUsername(email);
          this.events.publish('user:login');
        }, err => {
        console.log(err);
        })
    // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    //   this.setUsername(email);
    //   return this.events.publish('user:login');
    // });
  }

  signup(email: string,password:string): Promise<any> {
    return this.firebase.doRegister(email,password)
      .then(res => {
        console.log(res);
        this.storage.set(this.HAS_LOGGED_IN, true);
          this.setUsername(email);
          this.events.publish('user:signup');
        }, err => {
        console.log(err);
        })
    // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    //   this.setUsername(email);
    //   return this.events.publish('user:signup');
    // });
  }

  logout(): Promise<any> {
    return this.firebase.doLogout()
      .then(res => {
        console.log(res);
        this.storage.remove(this.HAS_LOGGED_IN);
          this.events.publish('user:logout');
        }, err => {
        console.log(err);
        })
    // return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
    //   return this.storage.remove('username');
    // }).then(() => {
    //   this.events.publish('user:logout');
    // });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
