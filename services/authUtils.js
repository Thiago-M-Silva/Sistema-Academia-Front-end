import { of } from 'https://cdn.jsdelivr.net/npm/rxjs@6.6.7/+esm';
import { map, catchError } from 'https://cdn.jsdelivr.net/npm/rxjs@6.6.7/operators/+esm';
import jwt_decode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.esm.js';


export class CheckAuthenticationAndRedirect {
  constructor() {
    this.jwt = localStorage.getItem('jwt');
    this.username = localStorage.getItem('username');
  }

  decodeToken(token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  checkAndRedirect() {
    if (this.jwt && this.username) {
      const decodedToken = this.decodeToken(this.jwt);

      if (!decodedToken) {
        window.location.href = '/pages/login/login.html';
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.error('Token expirado');
        window.location.href = '/pages/login/login.html';
        return;
      }

      window.location.href = '/pages/client/home.html';

      //document.getElementById('loggedInUser').textContent = this.username;
      // if (decodedToken.role === 'cliente') {
      //   window.location.href = '/pages/client/home.html';
      // } else if (decodedToken.role === 'admin') {
      //   window.location.href = '/pages/admin/home.html';
      // } else {
      //   window.location.href = '/pages/login/login.html';
      // }
    } else {
      window.location.href = '/pages/login/login.html';
    }
  }
}
