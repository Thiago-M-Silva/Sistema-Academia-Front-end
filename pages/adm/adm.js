import { HttpReq } from "../../services/httpReq.js";
import { CheckAuthenticationAndRedirect } from "../../services/authUtils.js";

export class Adm {
    constructor() {
        this.httpReq = new HttpReq();
        this.checkRed = new CheckAuthenticationAndRedirect();
        this.jwt = localStorage.getItem('jwt');
        this.dados = {};
    }

    logout() {
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

    getUsuarios() {
        const endpoint = 'user/All';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        this.httpReq
            .httpGetUser(endpoint, headers)
            .done((response) => {
                console.log(response);
                this.dados = response.dados;
                console.log(this.dados);
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
            })
    }

    onInit() {
        this.checkRed.saiInvasor();
    }


    listener() {

        document.getElementById('logoutBtn').onclick = () => adm.logout();


        $('#getUsuariosBtn').click(function () {

            let dados = adm.getUsuarios();
            console.log(dados);


            const data = [
                // Your JSON data goes here
                {
                    "name": "teste",
                    "idade": " ",
                    "peso": "60kg",
                    "altura": " ",
                    "nome": "mensal",
                    "segundaFeira": "{\"descanso\":false,\"exercícios\":[{\"nome\":\"Supino\",\"séries\":4,\"repetições\":12,\"peso\":\"10kg\"},{\"nome\":\"Rosca Direta\",\"séries\":3,\"repetições\":10,\"peso\":\"10kg\"},{\"nome\":\"Agachamento\",\"séries\":4,\"repetições\":15,\"peso\":\"10kg\"}]}",
                    "tercaFeira": "{\"descanso\":false,\"exercícios\":[{\"nome\":\"Cadeira Abdutora\",\"séries\":3,\"repetições\":15,\"peso\":\"10kg\"},{\"nome\":\"Tríceps Testa\",\"séries\":4,\"repetições\":12,\"peso\":\"10kg\"},{\"nome\":\"Remada Curvada\",\"séries\":4,\"repetições\":10,\"peso\":\"10kg\"}]}",
                    "quartaFeira": "{\"descanso\":false,\"exercícios\":[{\"nome\":\"Elevação Lateral\",\"séries\":3,\"repetições\":12,\"peso\":\"10kg\"},{\"nome\":\"Leg Press\",\"séries\":4,\"repetições\":15,\"peso\":\"10kg\"},{\"nome\":\"Crucifixo\",\"séries\":4,\"repetições\":10,\"peso\":\"10kg\"}]}",
                    "quintaFeira": "{\"descanso\":false,\"exercícios\":[{\"nome\":\"Desenvolvimento com Halteres\",\"séries\":4,\"repetições\":12,\"peso\":\"10kg\"},{\"nome\":\"Flexão de Braço\",\"séries\":3,\"repetições\":15,\"peso\":\"10kg\"},{\"nome\":\"Cadeira Extensora\",\"séries\":4,\"repetições\":12,\"peso\":\"10kg\"}]}",
                    "sextaFeira": "{\"descanso\":false,\"exercícios\":[{\"nome\":\"Pullover\",\"séries\":3,\"repetições\":10,\"peso\":\"10kg\"},{\"nome\":\"Puxada Alta\",\"séries\":4,\"repetições\":12,\"peso\":\"10kg\"},{\"nome\":\"Leg Curl\",\"séries\":4,\"repetições\":15,\"peso\":\"10kg\"}]}",
                    "sabado": "{\"descanso\":false,\"exercícios\":[{\"nome\":\"Stiff\",\"séries\":4,\"repetições\":12,\"peso\":\"10kg\"},{\"nome\":\"Rosca Alternada\",\"séries\":3,\"repetições\":10,\"peso\":\"10kg\"},{\"nome\":\"Panturrilha em Pé\",\"séries\":4,\"repetições\":15,\"peso\":\"10kg\"}]}",
                    "domingo": "{\"descanso\":true}",
                    "email": "filhoandre53468100@gmail.com"
                },
            ];

            // Render table
            const template = $('#template').html();
            const rendered = Mustache.render(template, { data });
            $('#dataTableBody').html(rendered);

            // Handle save button click
            $('#saveChanges').on('click', function () {
                const rows = $('#dataTableBody tr');
                const updatedData = [];
                rows.each(function () {
                    const row = $(this);
                    const rowData = {
                        name: row.find('td').eq(0).text(),
                        idade: row.find('td').eq(1).text(),
                        peso: row.find('td').eq(2).text(),
                        altura: row.find('td').eq(3).text(),
                        segundaFeira: row.find('td').eq(4).text(),
                        tercaFeira: row.find('td').eq(5).text(),
                        quartaFeira: row.find('td').eq(6).text(),
                        quintaFeira: row.find('td').eq(7).text(),
                        sextaFeira: row.find('td').eq(8).text(),
                        sabado: row.find('td').eq(9).text(),
                        domingo: row.find('td').eq(10).text(),
                        email: row.data('id')
                    };
                    updatedData.push(rowData);
                });

                // Do something with updatedData, e.g., send to server
                console.log('Updated Data:', updatedData);
            });

            // Handle delete button click
            $(document).on('click', '.delete-row', function () {
                $(this).closest('tr').remove();
            });
        });
    }
}

const adm = new Adm();
adm.onInit();

adm.listener();
