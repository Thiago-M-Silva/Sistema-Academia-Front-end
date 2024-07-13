const ControllerLogin = {
  init: function () {
    $(document).ready(() => {
      this.setupEventHandlers();
    });
  },

  setupEventHandlers: function () {
    $("#signin").on("submit", this.handleSignIn.bind(this));
    $("#signup").on("submit", this.handleSignUp.bind(this));
    this.setupPasswordToggle();
    this.listenerLogin();
  },

  handleSignIn: function (event) {
    event.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    const requestData = {
      email,
      password
    };

    this.sendRequest("login", requestData);
  },

  handleSignUp: function (event) {
    event.preventDefault();
    const name = $("#firstname").val() + $("#lastname").val();
    const email = $("#email").val();
    const password = $("#password_registro").val();
    const idade = $("#age").val();
    const peso = $("#weight").val();
    const altura = $("#height").val();
    const plano = $("#plan").val();
    const requestData = {
      name,
      email,
      password,
      idade,
      peso,
      altura,
      plano
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

  setupPasswordToggle: function () {
    $(document).on("click", ".btn-toggle-password", function () {
      const targetId = $(this).data("target");
      const $passwordField = $("#" + targetId);

      if ($passwordField.attr("type") === "password") {
        $passwordField.attr("type", "text");
        $(this).text("Esconder Senha");
      } else {
        $passwordField.attr("type", "password");
        $(this).text("Mostrar Senha");
      }
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
