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
        return this.httpReq
            .httpGetUser(endpoint, headers)
            .done((response) => {
                console.log(response);
                this.dados = response.dados;
                return this.dados; // Certifique-se de retornar os dados
            })
            .fail((error) => {
                console.log("Erro na requisicao: ", error);
                return [];
            });
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
        $('#getUsuariosBtn').click(async () => {
            // Simulate fetching data
            const dados = [
                // Example data
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

            // Prepares the data for Grid.js
            const gridData = dados.map(user => ([
                user.name,
                '<button type="button" class="btn btn-danger btn-sm delete-row">Delete</button>',
                user.idade,
                user.peso,
                user.altura,
                user.segundaFeira,
                user.tercaFeira,
                user.quartaFeira,
                user.quintaFeira,
                user.sextaFeira,
                user.sabado,
                user.domingo,
                user.email,
            ]));

            // Initialize Grid.js
            new gridjs.Grid({
                columns: [
                    'Nome',
                    {
                        name: 'Ação',
                        formatter: (cell) => gridjs.html(cell)
                    },
                    'Idade',
                    'Peso',
                    'Altura',
                    'Segunda-Feira',
                    'Terça-Feira',
                    'Quarta-Feira',
                    'Quinta-Feira',
                    'Sexta-Feira',
                    'Sábado',
                    'Domingo',
                    'Email'
                ],
                data: gridData,
                pagination: true,
                search: true,
                sort: true
            }).render(document.getElementById('grid'));

            $('#dataModal').modal('show');

            // Handle save button click
            $('#saveChanges').on('click', () => {
                const updatedData = gridData.map(row => ({
                    name: row[0],
                    idade: row[2],
                    peso: row[3],
                    altura: row[4],
                    segundaFeira: row[5],
                    tercaFeira: row[6],
                    quartaFeira: row[7],
                    quintaFeira: row[8],
                    sextaFeira: row[9],
                    sabado: row[10],
                    domingo: row[11],
                    email: row[12]
                }));

                // Do something with updatedData, e.g., send to server
                console.log('Updated Data:', updatedData);
            });

            setTimeout(() => {
                $('[data-column-id="nome"]').click();
            }, 200);

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
