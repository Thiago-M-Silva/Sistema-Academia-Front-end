import { HttpReq } from "../../services/httpReq.js";
import { CheckAuthenticationAndRedirect } from "../../services/authUtils.js";

class ControllerLogin {
  httpReq = new HttpReq();
  checkAuth = new CheckAuthenticationAndRedirect();

  constructor() {
    $(document).ready(() => {
      this.setupEventHandlers();
    });
  }

  setupEventHandlers() {
    $("#signin").on("submit", this.handleSignIn.bind(this));
    $("#signup").on("submit", this.handleSignUp.bind(this));
    this.setupPasswordToggle();
    this.listenerLogin();
  }

  async handleSignIn(event) {
    event.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    const requestData = { email, password };

    await this.sendRequest("login", requestData);
  }

  async handleSignUp(event) {
    event.preventDefault();
    const name = $("#firstname").val() + " " + $("#lastname").val();
    const email = $("#email").val();
    const password = $("#password_registro").val();
    const idade = $("#age").val();
    const peso = $("#weight").val();
    const altura = $("#height").val();
    const plano = $("#plan").val();
    const requestData = { name, email, password, idade, peso, altura, plano };

    await this.sendRequest("registrar", requestData);
  }

  async sendRequest(endpoint, data) {
    try {
      const response = await this.httpReq.httpPost(endpoint, data);
      console.log("Dados recebidos:", response);

      // Chama o método para verificar a autenticação e redirecionar
      await this.sucesso();
    } catch (error) {
      console.error("Erro na requisição:", error);
      // Aqui você pode lidar com o erro da requisição
    }
  }

  setupPasswordToggle() {
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
  }

  async sucesso() {
    // Utilize o método de promessas do jQuery corretamente
    await Promise.all([
      $("#login-card").find("*").fadeOut(500).promise(),
      $("#login-card").append("<span class='text-center white' style='font-size: 48px' ></span>").hide().fadeIn(500),
      $(".shape").fadeOut(500).promise()
    ]);

    $("#login-card").css({
      "animation": "transicaoSaida 2s forwards"
    });

    // Aguarde o término da animação CSS antes de redirecionar
    const animationDuration = 2000; // Duração da animação em milissegundos (2 segundos)
    setTimeout(async () => {
      await this.checkAuth.checkAndRedirect('cliente');
    }, animationDuration);
  }

  listenerCadastro() {
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
  }

  listenerLogin() {
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
  }
}

const controllerLogin = new ControllerLogin();
