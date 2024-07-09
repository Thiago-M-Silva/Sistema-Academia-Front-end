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


};
