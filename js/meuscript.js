$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/listar_pessoas',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (pessoas) {
        // percorrer a lista de pessoas retornadas; 
        for (var i in pessoas) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da pessoa
            '<td>' + pessoas[i].nome + '</td>' + 
            '<td>' + pessoas[i].email + '</td>' + 
            '<td>' + pessoas[i].telefone + '</td>' +
            '<td>' + pessoas[i].cidade + '</td>' + 
            '<td>' + pessoas[i].bairro + '</td>' +
            '<td>' + pessoas[i].senha + '</td>' + 
            '<td><a href=# id="excluir_' + pessoas[i].id + '" ' + 
              'class="excluir_pessoa"><img src="../img/lixeira.png" '+
              'alt="Excluir pessoa" title="Excluir pessoa" height="25"></a>' + 
            '</td>' + 
            '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaPessoas').append(lin);
        }
    }
    });


    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btn_incluir_pessoa", function() {
        //pegar dados da tela
        nome = $("#nome").val();
        email = $("#email").val();
        tel = $("#telefone").val();
        cidade = $("#cidade").val();
        bairro = $("#bairro").val();
        senha = $("#senha").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, email: email, 
            telefone: tel,  cidade: cidade, bairro: bairro, senha: senha });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_pessoa',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: pessoaIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function pessoaIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Pessoa incluída com sucesso!");
                // limpar os campos
                $("#nome").val("");
                $("#email").val("");
                $("#telefone").val("");
                $("#cidade").val("");
                $("#bairro").val("");
                $("#senha").val("");
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


    // código para os ícones de excluir pessoas (classe css)
    $(document).on("click", ".excluir_pessoa", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da pessoa
        var nome_icone = "excluir_";
        var id_pessoa = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da pessoa
        $.ajax({
            url: 'http://localhost:5000/excluir_pessoa/'+id_pessoa,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: pessoaExcluida, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function pessoaExcluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                alert("Pessoa excluída com sucesso!");
                // remover da tela a linha cuja pessoa foi excluída
                $("#linha_" + id_pessoa).fadeOut(1000, function(){});
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