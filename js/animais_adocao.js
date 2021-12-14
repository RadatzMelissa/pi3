$(function() { // quando o documento estiver pronto/carregado

    var id_adocao = []
    
    $.ajax({
        url: 'http://localhost:5000/listar_adocao',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (adocao) {
        // percorrer a lista de adoções retornadas; 
        for (var i in adocao) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da adocao
            '<td>' + adocao[i].nome_adocao + '</td>' + 
            '<td>' + adocao[i].idade + '</td>' +
            '<td>' + adocao[i].sexo + '</td>' +
            '<td>' + adocao[i].tamanho + '</td>' + 
            '<td>' + adocao[i].especie + '</td>' +
            '<td>' + adocao[i].raca + '</td>' +
            '<td>' + adocao[i].cor + '</td>' +
            '<td>' + adocao[i].foto + '</td>' +
            '<td>' + adocao[i].descricao + '</td>' +
            '<td>' + adocao[i].obs + '</td>' +
            '<td><a href=# id="excluir_' + adocao[i].id + '" ' + 
              'class="excluir_adocao"><img src="../img/lixeira.png" '+
              'alt="Excluir adocao" title="Excluir adocao" height="25"></a>' + 
            '</td>' +
            '<td><a href=# id="alterar_' + adocao[i].id + '" ' + 
              'class="alterar_adocao"><img src="../img/editar.png" '+
              'alt="Alterar adocao" title="Alterar adocao" height="25"></a>' + 
            '</td>' + 
            '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaAdocoes').append(lin);
        }
    }
    });

    // incluir adocao
    $(document).on("click", "#btn_incluir_adocao", function() {
        //pegar dados da tela
        nome_adocao = $("#nome_adocao").val();
        idade = $("#idade").val();
        sexo = $("#sexo").val();
        tamanho = $("#tamanho").val();
        especie = $("#especie").val();
        raca = $("#raca").val();
        cor = $("#cor").val();
        foto = $("#foto").val();
        descricao = $("#descricao").val();
        obs = $("#obs").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome_adocao: nome_adocao, idade: idade, 
            sexo: sexo,  tamanho: tamanho, especie: especie, raca: raca, cor: cor,
            foto: foto, descricao: descricao, obs: obs});
            // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_adocao',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: dadosIncluidos, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Dados incluídos com sucesso!");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });


    // código para os ícones de excluir adocao (classe css)
    $(document).on("click", ".excluir_adocao", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da adocao
        var nome_icone = "excluir_";
        var id_adocao = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da adocao
        $.ajax({
            url: 'http://localhost:5000/excluir_adocao/'+id_adocao,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: adocaoExcluida, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function adocaoExcluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                alert("Adoção excluída com sucesso!");
                // remover da tela a linha cuja adocao foi excluída
                $("#linha_" + id_adocao).fadeOut(1000, function(){});
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

    $(document).on("click", ".alterar_adocao", function(){
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da adocao
        var nome_icone = "alterar_";
        var id_adocao = componente_clicado.substring(nome_icone.length);
        function mostrarCadastro(){
            $("#tabla_alterar_adocao").removeClass('d-none');
            $("#lista_adocao").addClass('d-none');
        }
        mostrarCadastro()
        $.ajax({
            url: 'http://localhost:5000/encontrar_adocao/'+id_adocao,
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: colocarValores, // chama a função colocarValores para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function colocarValores(adocao){
            //preencher os campos com os dados já cadastrados
            $("#nome_adocao").val(adocao[0].nome_adocao);
            $("#idade").val(adocao[0].idade);
            $("#sexo").val(adocao[0].sexo);
            $("#tamanho").val(adocao[0].tamanho);
            $("#especie").val(adocao[0].especie);
            $("#raca").val(adocao[0].raca);
            $("#cor").val(adocao[0].cor);
            $("#foto").val(adocao[0].foto);
            $("#descricao").val(adocao[0].descricao);
            $("#obs").val(adocao[0].obs);
        }


        // solicitar a exclusão da adocao
        $.ajax({
            url: 'http://localhost:5000/excluir_adocao/'+id_adocao,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            error: erroAoExcluir
        });
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir os dados antigos, verifique o backend: ");
        }
        });


    // código para os ícones de alterar adocao (classe css)
    $(document).on("click", "#btn_alterar_adocao", function(id_adocao) {
        //pegar dados da tela
        nome_adocao = $("#nome_adocao").val();
        idade = $("#idade").val();
        sexo = $("#sexo").val();
        tamanho = $("#tamanho").val();
        especie = $("#especie").val();
        raca = $("#raca").val();
        cor = $("#cor").val();
        foto = $("#foto").val();
        descricao = $("#descricao").val();
        obs = $("#obs").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome_adocao: nome_adocao, idade: idade, 
            sexo: sexo,  tamanho: tamanho, especie: especie, raca: raca, cor: cor,
            foto: foto, descricao: descricao, obs: obs});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_adocao',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: dadosIncluidos, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Dados alterados com sucesso!");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir os novos dados, verifique o backend: ");
        }
    });