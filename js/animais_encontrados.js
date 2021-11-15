$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/listar_encontrados',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (encontrado) {
        // percorrer a lista de adoções retornadas; 
        for (var i in encontrado) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da encontrado 
            '<td>' + encontrado[i].idade + '</td>' +
            '<td>' + encontrado[i].sexo + '</td>' +
            '<td>' + encontrado[i].tamanho + '</td>' + 
            '<td>' + encontrado[i].especie + '</td>' +
            '<td>' + encontrado[i].raca + '</td>' +
            '<td>' + encontrado[i].cor + '</td>' +
            '<td>' + encontrado[i].foto + '</td>' +
            '<td>' + encontrado[i].descricao + '</td>' +
            '<td>' + encontrado[i].coleira + '</td>' +
            '<td>' + encontrado[i].cidade_visto + '</td>' +
            '<td>' + encontrado[i].bairro_visto + '</td>' + 
            '<td>' + encontrado[i].rua_visto + '</td>' + 
            '<td>' + encontrado[i].data_visto + '</td>' +  
            '<td><a href=# id="excluir_' + encontrado[i].id + '" ' + 
              'class="excluir_encontrado"><img src="../img/lixeira.png" '+
              'alt="Excluir encontrado" title="Excluir encontrado" height="25"></a>' + 
            '</td>' + 
            '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaEncontrados').append(lin);
        }
    }
    });


    // código para mapear click do botão incluir encontrado
    $(document).on("click", "#btn_incluir_encontrado", function() {
        //pegar dados da tela
        nome_encontrado = $("#nome_encontrado").val();
        idade = $("#idade").val();
        sexo = $("input[name='sexo']:checked").val();
        tamanho = $("input[name='tamanho']:checked").val();
        especie = $("input[name='especie']:checked").val();
        raca = $("#raca").val();
        cor = $("#cor").val();
        foto = $("#foto").val();
        descricao = $("#descricao").val();
        nome_encontrado = $("#nome_encontrado").val();
        coleira = $("#coleira").val();
        cidade_visto = $("#cidade_visto").val();
        bairro_visto = $("#bairro_visto").val();
        rua_visto = $("#rua_visto").val();
        data_visto = $("#data_visto").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome_encontrado: nome_encontrado, idade: idade, 
            sexo: sexo,  tamanho: tamanho, especie: especie, raca: raca, cor:cor,
            foto: foto, descricao: descricao, nome_encontrado: nome_encontrado, 
            coleira: coleira, cidade_visto: cidade_visto, bairro_visto: bairro_visto, 
            rua_visto: rua_visto, data_visto: data_visto});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_encontrado',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: encontradoIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function encontradoIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("encontrado incluída com sucesso!");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + "erro ao incluir dados!");
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: erro ao incluir dados!");
        }
    });


    // código para os ícones de excluir encontrado (classe css)
    $(document).on("click", ".excluir_encontrado", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da encontrado
        var nome_icone = "excluir_";
        var id_encontrado = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da encontrado
        $.ajax({
            url: 'http://localhost:5000/excluir_encontrado/'+id_encontrado,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: encontradoExcluida, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function encontradoExcluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                alert("Adoção excluída com sucesso!");
                // remover da tela a linha cuja encontrado foi excluída
                $("#linha_" + id_encontrado).fadeOut(1000, function(){});
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
