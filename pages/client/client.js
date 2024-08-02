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
}

// Instancia a classe Client
const client = new Client();

// Associando os botões aos métodos da classe
document.getElementById('logoutBtn').onclick = () => client.logout();
document.getElementById('getTreinoBtn').onclick = () => client.getTreino();
document.getElementById('attTreinoBtn').onclick = () => client.attTreino();
document.getElementById('delTreinoBtn').onclick = () => client.delTreino();
