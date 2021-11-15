# Exemplo mínimo
# Derivado de: https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/

# Importações
from re import A
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

# Configurações
app = Flask(__name__) # Vínculo com o Flask
CORS(app)
# Caminho do arquivo de banco de dados
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, 'sistema_pi.db')
# Sqlalchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Remover warnings
db = SQLAlchemy(app) # Vínculo com o SQLAlchemy
