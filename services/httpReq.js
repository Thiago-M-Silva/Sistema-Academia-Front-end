import { CheckAuthenticationAndRedirect } from "../services/authUtils.js";

export class HttpReq {
  constructor() {
    this.url = "https://melivra.com:8008/api/";
    this.urlAdm = "https://melivra.com:8009/api/";
    this.checkAuth = new CheckAuthenticationAndRedirect();
  }

  httpPost(endpoint, body) {
    return $.ajax({
      url: this.url + endpoint,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(body)
    }).done((response) => {
      // Armazena o token no localStorage
      if (response && response.dados && response.dados.token) {
        localStorage.setItem('jwt', response.dados.token);
        if (body.username) {
          localStorage.setItem('username', body.username);
        }
      }
      
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        customClass: {
          popup: 'swal2-popup-custom',
          icon: 'swal2-icon-custom',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        },
        background: '#000',
        backdrop: 'rgba(0, 0, 0, 0.4)'
      });
    });
  }

  httpGet(endpoint, headers) {
    return $.ajax({
      url: this.url + endpoint,
      type: 'GET',
      headers: headers
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        customClass: {
          popup: 'swal2-popup-custom',
          icon: 'swal2-icon-custom',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        },
        background: '#000',
        backdrop: 'rgba(0, 0, 0, 0.4)'
      });
    });
  }

  httpPut(endpoint, body) {
    return $.ajax({
      url: this.url + endpoint,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(body)
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        customClass: {
          popup: 'swal2-popup-custom',
          icon: 'swal2-icon-custom',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        },
        background: '#000',
        backdrop: 'rgba(0, 0, 0, 0.4)'
      });
    });
  }

  httpDelete(endpoint, headers) {
    return $.ajax({
      url: this.url + endpoint,
      type: 'DELETE',
      headers: headers
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        customClass: {
          popup: 'swal2-popup-custom',
          icon: 'swal2-icon-custom',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        },
        background: '#000',
        backdrop: 'rgba(0, 0, 0, 0.4)'
      });
    });
  }

  httpPutJwt(endpoint, headers, body) {
    return $.ajax({
      url: this.url + endpoint,
      type: 'PUT',
      headers: headers,
      contentType: 'application/json',
      data: JSON.stringify(body)
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
    })
  }

  //funcoes abaixo para adms
  httpGetAdm(endpoint, headers) {
    return $.ajax({
      url: this.urlAdm + endpoint,
      type: 'GET',
      headers: headers
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
    });
  }

  httpPostAdm(endpoint, body) {
    return $.ajax({
      url: this.urlAdm + endpoint,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(body)
    }).done((response) => {
      // Armazena o token no localStorage
      if (response && response.dados && response.dados.token) {
        localStorage.setItem('jwt', response.dados.token);
        if (body.username) {
          localStorage.setItem('username', body.username);
        }
      }
      
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
        customClass: {
          popup: 'swal2-popup-custom',
          icon: 'swal2-icon-custom',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        },
        background: '#000',
        backdrop: 'rgba(0, 0, 0, 0.4)'
      });
    });
  }
  

  httpGetUser(endpoint, headers) {
    return $.ajax({
      url: this.urlAdm + endpoint,
      type: 'GET',
      headers: headers
    }).fail((xhr, status, error) => {
      let errorMessage = "Ocorreu um erro na requisição.";
      if (xhr.responseJSON && xhr.responseJSON.message) {
        errorMessage = xhr.responseJSON.message;
      } else if (xhr.statusText) {
        errorMessage = xhr.statusText;
      }
    });
  }

}
