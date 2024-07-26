// httpReq.js
import { checkAuthenticationAndRedirect } from './authUtils.js';

const httpReq = {
  url: 'http://melivra.com:8008/api/',

  httpPost: function(endpoint, body) {
    let url = this.url + endpoint;
    return $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(body)
    }).done(function(){
        checkAuthenticationAndRedirect();
    }).fail(function(xhr, status, error) {
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
  },

  httpGet: function(endpoint, headers = {}) {
    let url = this.url + endpoint;
    return $.ajax({
      url: url,
      type: 'GET',
      headers: headers
    }).fail(function(xhr, status, error) {
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
  },

  httpPut: function(endpoint, body) {
    let url = this.url + endpoint;
    return $.ajax({
      url: url,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(body)
    }).fail(function(xhr, status, error) {
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
  },

  httpDelete: function(endpoint) {
    let url = this.url + endpoint;
    return $.ajax({
      url: url,
      type: 'DELETE'
    }).fail(function(xhr, status, error) {
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
};

export default httpReq;
