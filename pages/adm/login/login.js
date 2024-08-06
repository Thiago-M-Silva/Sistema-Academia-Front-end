import { HttpReq } from "../../../services/httpReq.js";
import { CheckAuthenticationAndRedirect } from "../../../services/authUtils.js";

class ControllerLogin {
  //acesso login adm http://127.0.0.1:5500/pages/adm/login/login.html
  
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

  handleSignIn(event) {
    event.preventDefault();
    const email = $("#username").val();
    const password = $("#password").val();
    const requestData = { email, password };

    this.sendRequest("login", requestData);
  }

  handleSignUp(event) {
    event.preventDefault();
    const name = $("#firstname").val() +" "+ $("#lastname").val();
    const email = $("#email").val();
    const password = $("#password_registro").val();
    const gerente = true; //cenario teste
    const professor = false; //cenario teste
    const recepcionista = false; //cenario teste
    //as informacoes acima sao necessarias para o cadastro de adm
    const requestData = { name, email, password, gerente, professor, recepcionista };

    this.sendRequest("registrar", requestData);
  }
  // postAdm para diferenciar do que e utilizado pelos clientes
  sendRequest(endpoint, data) {
    this.httpReq
      .httpPostAdm(endpoint, data)
      .done((response) => {
        console.log("Dados recebidos:", response);
        this.sucesso();
      })
      .fail((error) => {
        console.error("Erro na requisição:", error);
        // Aqui você pode lidar com o erro da requisição
      });
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

    // Após o término das animações, aplique o CSS com a animação desejada
    $("#login-card").css({
      "animation": "transicaoSaida 2s forwards"
    });

    // Aguarde o término da animação CSS antes de redirecionar
    const animationDuration = 2000; // Duração da animação em milissegundos (2 segundos)
    setTimeout(async () => {
      await this.checkAuth.checkAndRedirect('admin');
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
