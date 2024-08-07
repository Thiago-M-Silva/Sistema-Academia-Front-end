import { HttpReq } from "../../services/httpReq.js";
import { CheckAuthenticationAndRedirect } from "../../services/authUtils.js";

class Client {
    constructor() {
        this.httpReq = new HttpReq();
        this.checkRed = new CheckAuthenticationAndRedirect();
        this.jwt = localStorage.getItem('jwt');
        this.dados = {};
    }

    // Método para criar headers com JWT
    criarHeaders() {
        return {
            'Authorization': 'Bearer ' + this.jwt
        };
    }

    async logout() {
        const endpoint = 'logout';
        try {
            const response = await this.httpReq.httpGet(endpoint, this.criarHeaders());
            console.log(response);
            localStorage.removeItem('jwt'); // Remover o JWT após logout
            this.checkRed.checkAndRedirect(); // Agora sem parâmetro, deve redirecionar para login
        } catch (error) {
            console.log("Erro na requisição: ", error);
        }
    }

    async getTreino() {
        const endpoint = 'treino';
        try {
            const response = await this.httpReq.httpGet(endpoint, this.criarHeaders());
            console.log(response);
            this.dados = response.dados;
            return this.dados;
        } catch (error) {
            console.log("Erro na requisição: ", error);
            throw error;
        }
    }

    async attTreino(body) {
        const endpoint = 'treino';
        console.log(body);
        try {
            return await this.httpReq.httpPutJwt(endpoint, this.criarHeaders(), body);
        } catch (error) {
            console.log("Erro na requisição: ", error);
            throw error;
        }
    }

    async delTreino() {
        const endpoint = 'treino';
        try {
            const response = await this.httpReq.httpDelete(endpoint, this.criarHeaders());
            console.log(response);
        } catch (error) {
            console.log("Erro na requisição: ", error);
        }
    }

    onInit() {
        this.checkRed.saiInvasor();
    }

    listener() {
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
                    this.logout();
                }
            });
        };

        $('#attTreinoBtn').click(() => {
            $('#treinoModal').modal('show');
            $('#salvarTreinoBtn').off('click').click(async () => {
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
                    await this.attTreino(treinoData);
                    console.log(treinoData);
                    $('#treinoModal').modal('hide');
                } catch (error) {
                    console.log("Erro na requisição: ", error);
                }
            });
        });

        $('#getTreinoBtn').click(async () => {
            try {
                const dados = await this.getTreino();
                const tabelaCorpo = $('#treinoTabelaCorpo');
                tabelaCorpo.empty(); // Limpar o conteúdo atual da tabela

                for (const dia in dados) {
                    tabelaCorpo.append(`
                        <tr>
                            <td>${dia.charAt(0).toUpperCase() + dia.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()}</td>
                            <td>${dados[dia]}</td>
                        </tr>
                    `);
                }

                $('#treinoModalVisualizacao').modal('show');
            } catch (error) {
                console.error('Erro ao obter dados do treino:', error);
            }
        });
    }
}

// Instancia a classe Client
const client = new Client();
client.listener();
client.onInit();
