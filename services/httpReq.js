import { CheckAuthenticationAndRedirect } from "../services/authUtils.js";

export class HttpReq {
    constructor() {
        this.url = "https://melivra.com:8008/api/";
        this.urlAdm = "https://melivra.com:8009/api/";
        this.checkAuth = new CheckAuthenticationAndRedirect();
    }

    exibirErro(xhr) {
        let errorMessage = "Ocorreu um erro na requisição.";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            errorMessage = xhr.responseJSON.message;
        } else if (xhr.statusText) {
            errorMessage = xhr.statusText;
        }
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: errorMessage,
            customClass: {
                popup: 'swal2-popup-custom',
                icon: 'swal2-icon-custom',
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel'
            },
            background: '#000',
            backdrop: 'rgba(0, 0, 0, 0.4)'
        });
    }

    async fazerRequisicao(method, endpoint, headers, body = null, isAdm = false) {
        const url = isAdm ? this.urlAdm + endpoint : this.url + endpoint;
        const options = {
            url: url,
            type: method,
            headers: headers,
            contentType: body ? 'application/json' : undefined,
            data: body ? JSON.stringify(body) : undefined,
            dataType: 'json' // Define o tipo de dados esperados
        };
        try {
            const response = await $.ajax(options);
            // Armazena o token no localStorage se presente
            if (response && response.dados && response.dados.token) {
                localStorage.setItem('jwt', response.dados.token);
                if (body && body.username) {
                    localStorage.setItem('username', body.username);
                }
            }
            return response;
        } catch (xhr) {
            this.exibirErro(xhr);
            throw xhr; // Re-throw para permitir tratamento adicional se necessário
        }
    }

    httpPost(endpoint, body) {
        return this.fazerRequisicao('POST', endpoint, null, body);
    }

    httpGet(endpoint, headers) {
        return this.fazerRequisicao('GET', endpoint, headers);
    }

    httpPut(endpoint, body) {
        return this.fazerRequisicao('PUT', endpoint, null, body);
    }

    httpDelete(endpoint, headers) {
        return this.fazerRequisicao('DELETE', endpoint, headers);
    }

    httpPutJwt(endpoint, headers, body) {
        return this.fazerRequisicao('PUT', endpoint, headers, body);
    }

    // Métodos para administração
    httpGetAdm(endpoint, headers) {
        return this.fazerRequisicao('GET', endpoint, headers, null, true);
    }

    httpPostAdm(endpoint, body) {
        return this.fazerRequisicao('POST', endpoint, null, body, true);
    }

    httpGetUser(endpoint, headers) {
        return this.fazerRequisicao('GET', endpoint, headers, null, true);
    }
}
