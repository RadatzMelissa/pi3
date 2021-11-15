''' O arquivo contém duas classes: Pessoa e Animal_adocao, que estão 
    sendo utilizadas na plataforma CRUD de animais perdidos 
    ou que estão para adoção.
    
    - Grupo 9 de PI - sistema de adoção de animais
    Aluna: Melissa Radatz - 302 INFO
'''

# Importações 
from config import *

class Pessoa(db.Model):
    """ Esta classe representa um usuário do sistema.
    """
    # Atributos da pessoa
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    email = db.Column(db.String(254))
    telefone = db.Column(db.String(254))
    cidade = db.Column(db.String(254))
    bairro = db.Column(db.String(254))
    senha = db.Column(db.String(254))

    # Método para expressar a pessoa em forma de texto
    def __str__(self):
        return f'(id={self.id}), {self.nome}, '+\
               f'{self.email}, {self.telefone}, {self.cidade}, ' +\
                f'{self.bairro}, {self.senha}'
    
    # Expressão da classe no formato json
    def json(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "email" : self.email,
            "telefone" : self.telefone,
            "cidade" : self.cidade,
            "bairro" : self.bairro,
            "senha" : self.senha
        }


class Animal(db.Model):
    """ Esta classe representa um animal cadastrado do sistema. """
    # Atributos da classe Animal
    id = db.Column(db.Integer, primary_key=True)
    idade = db.Column(db.String(254))
    sexo = db.Column(db.String(254))
    tamanho = db.Column(db.String(254))
    especie = db.Column(db.String(254))
    raca = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    foto = db.Column(db.String(254))
    descricao = db.Column(db.String(254))

    # atributo necessário para armazenar tipo de classe especializada (discriminador)
    type = db.Column(db.String(50))
    
    # definições de mapeamento da classe mãe
    __mapper_args__ = {
        'polymorphic_identity':'animal', 
        'polymorphic_on':type # nome do campo que vincula os filhos
        }

    '''# Atributo de chave estrangeira
    pessoa_id = db.Column(db.Integer, db.ForeignKey(Pessoa.id), nullable=False)
    # Atributo de relacionamento, para acesso aos dados via objeto
    pessoa = db.relationship("Pessoa")'''

    # Método para expressar o animal em forma de texto
    def __str__(self): 
        return f'(id={self.id}), {self.idade}, {self.sexo}, {self.tamanho}'+ \
            f'{self.especie}, {self.raca}, {self.cor}, {self.foto}, {self.descricao}'

    # Expressão da classe no formato json
    def json(self):
        return {
            "id":self.id,
            "idade":self.idade,
            "sexo":self.sexo,
            "tamanho":self.tamanho,
            "especie":self.especie,
            "raca":self.raca,
            "cor":self.cor,
            "foto":self.foto,
            "descricao":self.descricao
        }


class Adocao(Animal):
    """ Esta classe representa uma adocao cadastrada do sistema. """
    # estabelecer vínculo com a tabela-pai. Este campo define
    # a criação da tabela adocao
    id = db.Column(db.Integer, db.ForeignKey('animal.id'), primary_key=True)

    # a identidade polimórfica da classe será armazenada 
    # no campo type da classe pai
    __mapper_args__ = { 
        'polymorphic_identity':'adocao',
    }
    
    # Atributos da classe Adocao
    nome_adocao = db.Column(db.String(254))
    obs = db.Column(db.String(254))

    # Método para expressar a adocao em forma de texto
    def __str__(self): 
        return f'{super().__str__()}, {self.nome_adocao}, {self.obs}'

    # Expressão da classe no formato json
    def json(self):
        return {
            "id":self.id,
            "idade":self.idade,
            "sexo":self.sexo,
            "tamanho":self.tamanho,
            "especie":self.especie,
            "raca":self.raca,
            "cor":self.cor,
            "foto":self.foto,
            "descricao":self.descricao,
            "nome_adocao":self.nome_adocao,
            "obs":self.obs
        }


class Encontrado(Animal):
    """ Esta classe representa uma animal encontrado cadastrada do sistema. """
    # estabelecer vínculo com a tabela-pai. Este campo define
    # a criação da tabela encontrados
    id = db.Column(db.Integer, db.ForeignKey('animal.id'), primary_key=True)

    # a identidade polimórfica da classe será armazenada 
    # no campo type da classe pai
    __mapper_args__ = { 
        'polymorphic_identity':'encontrados',
    }
    
    # Atributos da classe Encontrado
    coleira = db.Column(db.String(254))
    cidade_visto = db.Column(db.String(254))
    bairro_visto = db.Column(db.String(254))
    rua_visto = db.Column(db.String(254))
    data_visto = db.Column(db.String(10))

    # Método para expressar a encontrados em forma de texto
    def __str__(self): 
        return f'{super().__str__()}, {self.coleira}, {self.cidade_visto}' + \
            f'{self.bairro_visto}, {self.rua_visto}, {self.data_visto}'

    # Expressão da classe no formato json
    def json(self):
        return {
            "id":self.id,
            "idade":self.idade,
            "sexo":self.sexo,
            "tamanho":self.tamanho,
            "especie":self.especie,
            "raca":self.raca,
            "cor": self.cor,
            "foto":self.foto,
            "descricao":self.descricao,
            "coleira":self.coleira,
            "cidade_visto":self.cidade_visto,
            "bairro_visto":self.bairro_visto,
            "rua_visto":self.rua_visto,
            "data_visto":self.data_visto
        }


class Perdido(Animal):
    """ Esta classe representa uma animal perdido cadastrada do sistema. """
    # estabelecer vínculo com a tabela-pai. Este campo define
    # a criação da tabela perdidos
    id = db.Column(db.Integer, db.ForeignKey('animal.id'), primary_key=True)

    # a identidade polimórfica da classe será armazenada 
    # no campo type da classe pai
    __mapper_args__ = { 
        'polymorphic_identity':'perdidos',
    }
    
    # Atributos da classe Perdido
    nome_perdido = db.Column(db.String(254))
    coleira = db.Column(db.String(254))
    cidade_visto = db.Column(db.String(254))
    bairro_visto = db.Column(db.String(254))
    rua_visto = db.Column(db.String(254))
    data_visto = db.Column(db.String(10))

    # Método para expressar a perdidos em forma de texto
    def __str__(self): 
        return f'{super().__str__()}, {self.nome_perdido}, {self.coleira}' + \
            f'{self.cidade_visto}, {self.bairro_visto}, {self.rua_visto}, {self.data_visto}'

    # Expressão da classe no formato json
    def json(self):
        return {
            "id":self.id,
            "idade":self.idade,
            "sexo":self.sexo,
            "tamanho":self.tamanho,
            "especie":self.especie,
            "raca":self.raca,
            "cor":self.cor,
            "foto":self.foto,
            "descricao":self.descricao,
            "nome_perdido":self.nome_perdido,
            "coleira":self.coleira,
            "cidade_visto":self.cidade_visto,
            "bairro_visto":self.bairro_visto,
            "rua_visto":self.rua_visto,
            "data_visto":self.data_visto
        }


# Teste das classes
if __name__ == "__main__":
    # Apagar o arquivo, se ele já existir
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # Criar tabelas
    db.create_all()

    # Testar a classe Pessoa
    p1 = Pessoa(nome = "nome1", email = "email1", telefone = "11 1111-1111",
                cidade = "cidade1", bairro =  "bairro1", senha = "senha1")
    p2 = Pessoa(nome = "nome2", email = "email2", telefone = "22 2222-2222",
                cidade = "cidade2", bairro =  "bairro2", senha = "senha2")       
    
    # Persistir
    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    
    a1=Adocao(idade="1", raca="poodle")
    # Persistir
    db.session.add(a1)
    db.session.commit()


    a2=Adocao(idade="3", raca="poodle")
    # Persistir
    db.session.add(a2)
    db.session.commit()

    # Imprimir o animal cadastrado em formato de texto
    print(f"Animal para adoção: {a1}")
    print(f"Animal para adoção em json: {a1.json()}")
    # Imprimir o animal cadastrado em formato de texto
    print(f"Animal para adoção: {a2}")
    print(f"Animal para adoção em json: {a2.json()}")