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

    async getUsuarios() {
        const endpoint = 'user/All';
        const headers = {
            'Authorization': 'Bearer ' + this.jwt
        };
        return await this.httpReq
            .httpGetUser(endpoint, headers)
            .then((response) => {
                console.log(response);
                return response.dados; // Retorne os dados diretamente
            })
            .catch((error) => {
                console.error("Erro na requisição: ", error);
                return []; // Retorne um array vazio em caso de erro para evitar quebrar o código
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
            let dados = await this.getUsuarios();

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
