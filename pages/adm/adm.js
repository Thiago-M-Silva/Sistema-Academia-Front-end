import { HttpReq } from "../../services/httpReq.js";
import { CheckAuthenticationAndRedirect } from "../../services/authUtils.js";

export class Adm { 
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
            .httpGetAdm(endpoint, headers)
            .done((response) => {
                console.log(response);
                this.checkRed.checkAndRedirect();
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            })
    }

    getUsuarios(){
        const endpoint = 'user/All';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        this.httpReq
            .httpGetUser(endpoint, headers)
            .done((response) => {
                console.log(response);
                this.dados = response.dados;
                console.log(dados);
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            })
    }

    onInit(){
        this.checkRed.saiInvasor();
    }
   
}

const adm = new Adm();
adm.onInit();


//evitar que a pagina esteja sendo acessada por outros meios
document.addEventListener('DOMContentLoaded', function() {
    client.onInit();
});


// Associando os botões aos métodos da classe
document.getElementById('logoutBtn').onclick = () => adm.logout();
document.getElementById('getUsuariosBtn').onclick = () => adm.getUsuarios();