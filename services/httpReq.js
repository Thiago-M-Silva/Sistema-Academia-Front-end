export const httpReq = {
    url: 'http://localhost:8006/api/',

    httpPost: function(url, parametro, body) {
        //garante que paramStr sera string
        let paramStr = parametro ? `${parametro}` : '';
        return $.ajax({
          url: url + paramStr,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(body)
        });
      },

    httpGet: function(url, parametro, headers = {}){
        let paramStr = parametro ? `${parametro}` : '';
        return $.ajax({
            url: url + paramStr,
            type: 'GET',
            headers: headers
        });
    },

    httpPut: function(){},

    httpDelete: function(){}
}