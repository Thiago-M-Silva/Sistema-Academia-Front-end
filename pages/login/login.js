const ControllerLogin = {
  init: function () {
    $(document).ready(() => {
      this.setupEventHandlers();
    });
  },

  setupEventHandlers: function () {
    $("#signin").on("submit", this.handleSignIn.bind(this));
    $("#signup").on("submit", this.handleSignUp.bind(this));
    this.listenerLogin();
  },

  handleSignIn: function (event) {
    event.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    const requestData = {
      username,
      password
    };

    this.sendRequest("login", requestData);
  },

  handleSignUp: function (event) {
    event.preventDefault();
    const name = $("#firstname").val();
    const username = $("#username").val();
    const password = $("#password").val();
    const plan = $("#plan").val();
    const requestData = {
      name,
      username,
      password,
      plan
    };

    this.sendRequest("registrar", requestData);
  },

  sendRequest: function (endpoint, data) {
    httpReq
      .httpPost(endpoint, data)
      .done((response) => {
        console.log("Dados recebidos:", response);
        // Aqui você pode lidar com a resposta da API
      })
      .fail((error) => {
        console.error("Erro na requisição:", error);
        // Aqui você pode lidar com o erro da requisição
      });
  },

  listenerCadastro: function () {
    $("#login")
      .off("click")
      .on("click", async () => {
        await Promise.all([
          $("#signup").fadeOut(500).promise(),
          $("#login-card").removeClass("card-expanded").promise(),
        ]);
        await Promise.all([
          $(".shape").fadeIn(1000).promise(),
          $("#signin").fadeIn(1000).promise(),
        ]);
        this.listenerLogin();
      });
  },

  listenerLogin: function () {
    $("#cadastrar")
      .off("click")
      .on("click", async () => {
        await Promise.all([
          $("#signin").fadeOut(500).promise(),
          $(".shape").fadeOut(500).promise(),
        ]);
        await Promise.all([
          $("#signup").fadeIn(1000).promise(),
          $("#login-card").addClass("card-expanded").promise(),
        ]);
        this.listenerCadastro();
      });
  },
};

ControllerLogin.init();