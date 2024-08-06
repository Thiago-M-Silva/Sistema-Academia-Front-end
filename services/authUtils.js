import jwt_decode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.esm.js';

export class CheckAuthenticationAndRedirect {
  constructor() {
    this.jwt = localStorage.getItem('jwt');
  }

  decodeToken(token) {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  checkAndRedirect(role) {
    if (this.jwt) {
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

      if (role === 'cliente') {
        window.location.href = '/pages/client/home.html';
      } else if (role === 'admin') {
        window.location.href = '/pages/adm/home.html';
      } else {
        window.location.href = '/pages/login/login.html';
      }
    } else {
      window.location.href = '/pages/login/login.html';
    }
  }

  //verifica se o token esta disponivel e se e o correto
  //redirecniona para a pagina de login caso nao exista token ou se estiver errado
  saiInvasor(){ 
    const token = localStorage.getItem('jwt');
    if (!token || !this.decodeToken(token)) {
      window.location.href = '/pages/login/login.html';
    }
  }
}
