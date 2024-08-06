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
                localStorage.removeItem('jwt'); // Remover o JWT após logout
                this.checkRed.checkAndRedirect(); // Agora sem parâmetro, deve redirecionar para login
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
                return this.dados;
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
    
    onInit(){
        this.checkRed.saiInvasor();
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
        
        $('#getTreinoBtn').click(async function() {
            // Mostrar o modal
            let dados = {
                "segundaFeira": "perna",
                "tercaFeira": "core",
                "quartaFeira": "peito",
                "quintaFeira": "braco",
                "sextaFeira": "costas",
                "sabado": "cardio",
                "domingo": "descanso"
            };

            // Preencher a tabela com os dados
            let tabelaCorpo = $('#treinoTabelaCorpo');
            tabelaCorpo.empty(); // Limpar o conteúdo atual da tabela

            for (let dia in dados) {
                tabelaCorpo.append(`
                    <tr>
                        <td>${dia.charAt(0).toUpperCase() + dia.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()}</td>
                        <td>${dados[dia]}</td>
                    </tr>
                `);
            }

            $('#treinoModalVisualizacao').modal('show');
        });
        
    }
}

// Instancia a classe Client
const client = new Client();

//evitar que a pagina esteja sendo acessada por outros meios
document.addEventListener('DOMContentLoaded', function() {
    client.onInit();
});
