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

    getTreino() {
        const endpoint = 'treino';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        return new Promise((resolve, reject) => {
            this.httpReq
                .httpGet(endpoint, headers)
                .done((response) => {
                    console.log(response);
                    console.log(response.dados);
                    this.dados = response.dados;
                    resolve(this.dados);
                })
                .fail((error) => {
                    console.log("Erro na requisição: ", error);
                    reject(error);
                });
        });
    }

    attTreino(body) {
        const endpoint = 'treino';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        
        console.log(body);
        return this.httpReq.httpPutJwt(endpoint, headers, body);
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
            $('#salvarTreinoBtn').click(async function() {
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

                try {
                    // Chamar o método attTreino com os dados do formulário
                    client.attTreino(treinoData);
                    console.log(treinoData)
                    // Fechar o modal
                    $('#treinoModal').modal('hide');
                } catch (error) {
                    console.log("Erro na requisição: ", error);
                    // O SweetAlert será chamado automaticamente no httpPutJwt em caso de falha
                }
            });
        });
        
        $('#getTreinoBtn').click(async function() {
            try {
                // Executar a requisição e aguardar a resposta
                let dados = await client.getTreino();
        
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
        
                // Mostrar o modal após preencher a tabela
                $('#treinoModalVisualizacao').modal('show');
            } catch (error) {
                console.error('Erro ao obter dados do treino:', error);
                // O SweetAlert será chamado automaticamente no httpGet em caso de falha
            }
        });
        
    }
}

// Instancia a classe Client
const client = new Client();
client.listener();
client.onInit();

