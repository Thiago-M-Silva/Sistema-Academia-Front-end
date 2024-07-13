// const { listenerCount } = require("process");
// import { httpReq } from "../../services/httpReq";


const ControllerLogin = {
  //url: 'http://localhost:8006/login',
  parametro: 'login',
  parametro2: 'registrar',

  init: function () {
    $(document).ready(() => {
      $('#signin').on('submit', (event) => {
        event.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        //const apiUrl = ControllerLogin.url;
        const requestData = { username: username, password: password };

        httpReq.httpPost(apiUrl, parametro, requestData).done((data) => {
          console.log('Dados recebidos:', data);
          // Aqui você pode lidar com a resposta da API
        }).fail((error) => {
          console.error('Erro na requisição: ', error);
          // Aqui você pode lidar com o erro da requisição
        });
      });
    });
  },

  init: function () {
    $(document).ready(() => {
      $('#signup').on('submit', (event) => {
        event.preventDefault();

        const name = $('#firstname').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const plan = $('#plan').val();

        //const apiUrl = ControllerLogin.url;
        const requestData = { name: name, username: username, password: password, plan: plan };

        httpReq.httpPost(apiUrl, parametro2, requestData).done((data) => {
          console.log('Dados recebidos:', data);
          // Aqui você pode lidar com a resposta da API
        }).fail((error) => {
          console.error('Erro na requisição: ', error);
          // Aqui você pode lidar com o erro da requisição
        });
      });
    });
  },

  // httpPost: function(url, body) {
  //   return $.ajax({
  //     url: url,
  //     type: 'POST',
  //     contentType: 'application/json',
  //     data: JSON.stringify(body)
  //   });
  // },


  // Função para configurar o listener de cadastro
  listenerCadastro: function () {
    $("#login").off("click");
    $("#login").on("click", async function (event) {
      // Garantir que as animações sejam executadas em paralelo usando Promise.all
      await Promise.all([
        $('#login-card').removeClass('card-expanded').promise(),

        $('#signup').fadeOut(500).promise(),
      ]);
      $('.shape').fadeIn(1000).promise(),
      $('#signin').fadeIn(1000).promise()
      // Ajustar o layout do card
      // Chamar o listener de login
      ControllerLogin.listenerLogin();
    });
  },

  // Função para configurar o listener de login
  listenerLogin: function () {
    $("#cadastrar").off("click");
    $("#cadastrar").on("click", async function (event) {
      // Garantir que as animações sejam executadas em paralelo usando Promise.all
      await Promise.all([
        $('#signin').fadeOut(500).promise(),
        $('.shape').fadeOut(500).promise(),
      ]);
      $('#signup').fadeIn(1000).promise()
      $('#login-card').addClass('card-expanded');
      // Ajustar o layout do card
      // Chamar o listener de cadastro
      ControllerLogin.listenerCadastro();
    });
  },



  start() {
    ControllerLogin.listenerLogin();
  }

};
