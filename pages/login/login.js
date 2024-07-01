$(document).ready(function() {
    var username = window.document.getElementsById('username')
    var password = window.document.getElementsById('password')
    var url

    // ainda não testado
    document.addEventListener('DOMContentLoaded', function() {
        const apiUrl = {url}; // Substitua pela URL da sua API
        const requestData = { username: {username}, password: {password} }; // Dados a serem enviados no corpo da requisição
    
        httpPost(apiUrl, requestData).subscribe(data => {
          if (data) {
            console.log('Dados recebidos:', data);
            // Manipule os dados recebidos aqui
          } else {
            console.log('Falha ao receber dados');
          }
        });
      });

    // passar isso aqui para outro lugar 
    const {from, of} = rxjs;
    const {switchMap, catchError} = rxjs.operators;

    function httpPost(url, body, headers = { 'Content-Type': 'application/json'}){
        return from(fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })).pipe(
            switchMap(response => {
                if(!response.ok){
                    throw new Error('Erro de rede!');
                }
                return response.json();
            }),
            catchError(error => {
                console.error('Erro na requisição: ', error);
                return of(null) //retorno de um observable null em caso de erro
            })
        )
    }

});
