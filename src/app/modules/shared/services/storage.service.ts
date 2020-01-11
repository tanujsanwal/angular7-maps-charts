import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  USER = 'user';
  TOKEN = 'token';
  ROLE = 'role';

  constructor() { }

  setToken(token) {
    localStorage.setItem(this.TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  delToken() {
    localStorage.removeItem(this.TOKEN);
  }

  setUser(data) {
    localStorage.setItem(this.USER, JSON.stringify(data));
  }

  // setRole(role) {
  //   localStorage.setItem(this.ROLE, JSON.stringify(role));
  // }
  // getRole() {
  //   return JSON.parse(localStorage.getItem(this.ROLE));
  // }

  getUser() {
    return JSON.parse(localStorage.getItem(this.USER));
  }

  delUser() {
    localStorage.removeItem(this.USER);
  }
}
