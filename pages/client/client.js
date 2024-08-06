import { HttpReq } from "../../services/httpReq.js";
import { CheckAuthenticationAndRedirect } from "../../services/authUtils.js";

class Client {
    constructor(){
        this.httpReq = new HttpReq();
        this.checkRed = new CheckAuthenticationAndRedirect();
        this.jwt = localStorage.getItem('jwt');
        this.dados = {};
    }

    logout(){
        const endpoint = 'logout';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        this.httpReq
            .httpGet(endpoint, headers)
            .done((response) => {
                console.log(response);
                this.checkRed.checkAndRedirect();
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            });
    }

    getTreino(){
        const endpoint = 'treino';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        this.httpReq
            .httpGet(endpoint, headers)
            .done((response) => {
                console.log(response);
                this.dados = response.dados;
                console.log(this.dados);
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            });
    }

    attTreino(body){
        const endpoint = 'treino';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };

        body = {
            'domingo': 'descanso',
            'segunda-feira': 'perna',
            'terca-feira': 'core',
            'quarta-feira': 'peito',
            'quinta-feira': 'braco',
            'sexta-feira': 'costas',
            'sabado': 'cardio',
        };

        this.httpReq
            .httpPutJwt(endpoint, headers, body)
            .done((response) => {
                console.log(response);
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            });
    }

    delTreino(){
        const endpoint = 'treino';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        this.httpReq
            .httpDelete(endpoint, headers)
            .done((response) => {
                console.log(response);
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            });
    }

    listener(){
        // Associando os botões aos métodos da classe
        document.getElementById('logoutBtn').onclick = () => {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Você realmente quer sair?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, sair',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    client.logout();
                }
            });
        };
        
      
        // Quando o botão 'attTreinoBtn' é clicado
        $('#attTreinoBtn').click(function() {
            // Mostrar o modal
            $('#treinoModal').modal('show');

            // Remover o evento de clique antigo (se houver)
            $('#salvarTreinoBtn').off('click');

            // Adicionar o novo evento de clique para 'salvarTreinoBtn'
            $('#salvarTreinoBtn').click(function() {
                // Coletar os dados do formulário
                const treinoData = {
                    'segunda-feira': $('#segunda-feira').val(),
                    'terca-feira': $('#terca-feira').val(),
                    'quarta-feira': $('#quarta-feira').val(),
                    'quinta-feira': $('#quinta-feira').val(),
                    'sexta-feira': $('#sexta-feira').val(),
                    'sabado': $('#sabado').val(),
                    'domingo': $('#domingo').val(),
                };

                // Chamar o método attTreino com os dados do formulário
                client.attTreino(treinoData);

                // Fechar o modal
                $('#treinoModal').modal('hide');
            });
        });
        
        // document.getElementById('attTreinoBtn').onclick = () => client.attTreino();
        // document.getElementById('delTreinoBtn').onclick = () => client.delTreino();

    }
}

// Instancia a classe Client
const client = new Client();

client.listener();
