// const { listenerCount } = require("process");

const ControllerLogin = {
  url: 'http://localhost:8006/login',

  init: function() {
    $(document).ready(() => {
      $('#login-form').on('submit', (event) => {
        event.preventDefault();
  
        const username = $('#username').val();
        const password = $('#password').val();
  
        const apiUrl = ControllerLogin.url;
        const requestData = { username: username, password: password };
  
        ControllerLogin.httpPost(apiUrl, requestData).done((data) => {
          console.log('Dados recebidos:', data);
          // Aqui você pode lidar com a resposta da API
        }).fail((error) => {
          console.error('Erro na requisição: ', error);
          // Aqui você pode lidar com o erro da requisição
        });
      });
    });
  },

  httpPost: function(url, body) {
    return $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(body)
    });
  },


  listenerCadastro: function() {
    $("#login").off("click");
    $("#login").on("click", function(event) {
        $('#login-card').removeClass('card-expanded');
        $('#signup').fadeOut(1000);
        $('.shape').fadeIn(1000);
        $('#signin').fadeIn(1000);
        ControllerLogin.listenerLogin();

    });
  },

  listenerLogin: function() {
    $("#cadastrar").off("click");
    $("#cadastrar").on("click", function(event) {
        $('#login-card').addClass('card-expanded');
        $('#signin').fadeOut(1000);
        $('.shape').fadeOut(1000);
        $('#signup').fadeIn(1000);
        ControllerLogin.listenerCadastro();

    });
  },


  start (){
    ControllerLogin.listenerLogin();
  }

};
