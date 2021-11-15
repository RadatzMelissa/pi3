from config import *
from classes_pi import Pessoa, Animal, Perdido, Encontrado, Adocao

@app.route("/")
def inicio():
    return 'Sistema de cadastro de pessoas. '+\
        '<a href="/listar_pessoas">Operação listar</a>'

@app.route("/listar_pessoas")
def listar_pessoas():
    # obter as pessoas do cadastro
    pessoas = db.session.query(Pessoa).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    pessoas_em_json = [ x.json() for x in pessoas ]
    # converter a lista do python para jsons
    resposta = jsonify(pessoas_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/listar_adocao")
def listar_adocao():
    # obter as pessoas do cadastro
    adocao = db.session.query(Adocao).all()
    # aplicar o método json que a classe Adocao possui a cada elemento da lista
    adocao_em_json = [ x.json() for x in adocao ]
    # converter a lista do python para jsons
    resposta = jsonify(adocao_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/listar_perdidos")
def listar_perdidos():
    # obter as pessoas do cadastro
    perdidos = db.session.query(Perdido).all()
    # aplicar o método json que a classe Adocao possui a cada elemento da lista
    perdidos_em_json = [ x.json() for x in perdidos ]
    # converter a lista do python para jsons
    resposta = jsonify(perdidos_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/listar_encontrados")
def listar_encontrados():
    # obter as pessoas do cadastro
    encontrados = db.session.query(Encontrado).all()
    # aplicar o método json que a classe Adocao possui a cada elemento da lista
    encontrados_em_json = [ x.json() for x in encontrados ]
    # converter a lista do python para jsons
    resposta = jsonify(encontrados_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/incluir_pessoa", methods=['post'])
def incluir_pessoa():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Pessoa(**dados) # criar a nova pessoa
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/incluir_adocao", methods=['post'])
def incluir_adocao():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova adocao
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Adocao(**dados) # criar a nova adocao
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/incluir_perdido", methods=['post'])
def incluir_perdido():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova perdido
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Perdido(**dados) # criar a nova perdido
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/incluir_encontrado", methods=['post'])
def incluir_encontrado():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova encontrado
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Encontrado(**dados) # criar a nova encontrado
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_pessoa/<int:pessoa_id>", methods=['DELETE'])
def excluir_pessoa(pessoa_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a pessoa do ID informado
        Pessoa.query.filter(Pessoa.id == pessoa_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_adocao/<int:adocao_id>", methods=['DELETE'])
def excluir_adocao(adocao_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a adocao do ID informado
        Adocao.query.filter(Adocao.id == adocao_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_perdido/<int:perdido_id>", methods=['DELETE'])
def excluir_perdido(perdido_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a perdido do ID informado
        Perdido.query.filter(Perdido.id == perdido_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_encontrado/<int:encontrado_id>", methods=['DELETE'])
def excluir_encontrado(encontrado_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a encontrado do ID informado
        Encontrado.query.filter(Encontrado.id == encontrado_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!
    
app.run(debug=True)
