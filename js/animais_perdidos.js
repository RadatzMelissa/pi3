$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/listar_perdidos',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (perdido) {
        // percorrer a lista de adoções retornadas; 
        for (var i in perdido) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da perdido
            '<td>' + perdido[i].nome_perdido + '</td>' +
            '<td>' + perdido[i].idade + '</td>' +
            '<td>' + perdido[i].sexo + '</td>' +
            '<td>' + perdido[i].tamanho + '</td>' + 
            '<td>' + perdido[i].especie + '</td>' +
            '<td>' + perdido[i].raca + '</td>' +
            '<td>' + perdido[i].cor + '</td>' +
            '<td>' + perdido[i].foto + '</td>' +
            '<td>' + perdido[i].descricao + '</td>' +
            '<td>' + perdido[i].coleira + '</td>' +
            '<td>' + perdido[i].cidade_visto + '</td>' +
            '<td>' + perdido[i].bairro_visto + '</td>' + 
            '<td>' + perdido[i].rua_visto + '</td>' + 
            '<td>' + perdido[i].data_visto + '</td>' + 
            '<td><a href=# id="excluir_' + perdido[i].id + '" ' + 
              'class="excluir_perdido"><img src="../img/lixeira.png" '+
              'alt="Excluir perdido" title="Excluir perdido" height="25"></a>' + 
            '</td>' +
            '<td><a href=# id="alterar_' + perdido[i].id + '" ' + 
              'class="alterar_perdido"><img src="../img/editar.png" '+
              'alt="Alterar perdido" title="Alterar perdido" height="25"></a>' + 
            '</td>' +
            '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaPerdidos').append(lin);
        }
    }
    });


    // código para mapear click do botão incluir perdido
    $(document).on("click", "#btn_incluir_perdido", function() {
        //pegar dados da tela
        nome_perdido = $("#nome_perdido").val();
        idade = $("#idade").val();
        sexo = $("#sexo").val();
        tamanho = $("#tamanho").val();
        especie = $("#especie").val();
        raca = $("#raca").val();
        cor = $("#cor").val();
        foto = $("#foto").val();
        descricao = $("#descricao").val();
        coleira = $("#coleira").val();
        cidade_visto = $("#cidade_visto").val();
        bairro_visto = $("#bairro_visto").val();
        rua_visto = $("#rua_visto").val();
        data_visto = $("#data_visto").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome_perdido: nome_perdido, idade: idade, 
            sexo: sexo,  tamanho: tamanho, especie: especie, raca: raca, cor:cor,
            foto: foto, descricao: descricao, coleira: coleira, cidade_visto: cidade_visto,
            bairro_visto: bairro_visto, rua_visto: rua_visto, data_visto: data_visto});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_perdido',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: perdidoIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function perdidoIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("perdido incluído com sucesso!");
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


    // código para os ícones de excluir perdido (classe css)
    $(document).on("click", ".excluir_perdido", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da perdido
        var nome_icone = "excluir_";
        var id_perdido = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da perdido
        $.ajax({
            url: 'http://localhost:5000/excluir_perdido/'+id_perdido,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: perdidoExcluida, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function perdidoExcluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                alert("Adoção excluída com sucesso!");
                // remover da tela a linha cuja perdido foi excluída
                $("#linha_" + id_perdido).fadeOut(1000, function(){});
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


    $(document).on("click", ".alterar_perdido", function(){
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID da perdido
        var nome_icone = "alterar_";
        var id_perdido = componente_clicado.substring(nome_icone.length);
        function mostrarCadastro(){
            $("#tabla_alterar_perdido").removeClass('d-none');
            $("#lista_perdido").addClass('d-none');
        }
        mostrarCadastro()
        $.ajax({
            url: 'http://localhost:5000/encontrar_perdido/'+id_perdido,
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: colocarValores, // chama a função colocarValores para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function colocarValores(perdido){
            //preencher os campos com os dados já cadastrados
            $("#nome_perdido").val(perdido[0].nome_perdido);
            $("#idade").val(perdido[0].idade);
            $("#sexo").val(perdido[0].sexo);
            $("#tamanho").val(perdido[0].tamanho);
            $("#especie").val(perdido[0].especie);
            $("#raca").val(perdido[0].raca);
            $("#cor").val(perdido[0].cor);
            $("#foto").val(perdido[0].foto);
            $("#descricao").val(perdido[0].descricao);
            $("#coleira").val(perdido[0].coleira);
            $("#cidade_visto").val(perdido[0].cidade_visto);
            $("#bairro_visto").val(perdido[0].bairro_visto);
            $("#rua_visto").val(perdido[0].rua_visto);
            $("#data_visto").val(perdido[0].data_visto);
        }


        // solicitar a exclusão da perdido
        $.ajax({
            url: 'http://localhost:5000/excluir_perdido/'+id_perdido,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            error: erroAoExcluir
        });
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir os dados antigos, verifique o backend:");
        }
        });


    // código para os ícones de alterar perdido (classe css)
    $(document).on("click", "#btn_alterar_perdido", function(id_perdido) {
        //pegar dados da tela
        nome_perdido = $("#nome_perdido").val();
        idade = $("#idade").val();
        sexo = $("#sexo").val();
        tamanho = $("#tamanho").val();
        especie = $("#especie").val();
        raca = $("#raca").val();
        cor = $("#cor").val();
        foto = $("#foto").val();
        descricao = $("#descricao").val();
        coleira = $("#coleira").val();
        cidade_visto = $("#cidade_visto").val();
        bairro_visto = $("#bairro_visto").val();
        rua_visto = $("#rua_visto").val();
        data_visto = $("#data_visto").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome_perdido: nome_perdido, idade: idade, 
            sexo: sexo,  tamanho: tamanho, especie: especie, raca: raca, cor:cor,
            foto: foto, descricao: descricao, coleira: coleira, 
            cidade_visto: cidade_visto, bairro_visto: bairro_visto, 
            rua_visto: rua_visto, data_visto: data_visto});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_perdido',
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
            alert("erro ao incluir os novos dados, verifique o backend:");
        }
    });