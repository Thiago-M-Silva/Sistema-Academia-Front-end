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

    redirectToLogin() {
        window.location.href = '/pages/login/login.html';
    }

    checkAndRedirect(role) {
        if (!this.jwt) {
            this.redirectToLogin();
            return;
        }

        const decodedToken = this.decodeToken(this.jwt);

        if (!decodedToken || (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000))) {
            console.error('Token inválido ou expirado');
            this.redirectToLogin();
            return;
        }

        const roleRedirects = {
            'cliente': '/pages/client/home.html',
            'admin': '/pages/adm/home.html'
        };

        window.location.href = roleRedirects[role] || '/pages/login/login.html';
    }

    saiInvasor() {
        if (!this.jwt || !this.decodeToken(this.jwt)) {
            this.redirectToLogin();
        }
    }
}
