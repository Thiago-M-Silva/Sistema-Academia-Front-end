// authUtils.js
export function checkAuthenticationAndRedirect() {
    
  const { of } = rxjs;
  const { map, catchError } = rxjs.operators;

  var jwt = localStorage.getItem('jwt');
  var username = localStorage.getItem('username');

  const decodeToken = (token) => {
    try {
      return of(jwt_decode(token));
    } catch (error) {
      return of(null);
    }
  };

  if (jwt && username) {
    decodeToken(jwt).pipe(
      map(decodedToken => {
        if (!decodedToken) {
          throw new Error('Token inválido');
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          throw new Error('Token expirado');
        }

        return decodedToken;
      }),
      catchError(error => {
        console.error('Erro:', error);
        window.location.href = '/pages/login/login.html';
        return of(null);
      })
    ).subscribe(decodedToken => {
      if (decodedToken) {
        document.getElementById('loggedInUser').textContent = username;
        if (decodedToken.role === 'cliente') {
          window.location.href = '/pages/client/home.html';
        } else if (decodedToken.role === 'admin') {
          window.location.href = '/pages/admin/home.html';
        } else {
          window.location.href = '/pages/login/login.html';
        }
      }
    });
  } else {
    // Se não estiver logado, redireciona de volta para a página de login
    window.location.href = '/pages/login/login.html';
  }
}
