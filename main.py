from flask import Flask, json, render_template, request
import requests
from models.moedas import Moedas


app=Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/buscar", methods = ["GET", "post"])
def buscar():
    banco = Moedas(request.form["nome"].upper(), "", "", "", "")
    token = 'kDnpTcmY5c3P7QfgnhCNmC'
    try:
        response = requests.get(f"https://brapi.dev/api/quote/{banco.nome}?range=5d&interval=1d&fundamental=true&modules=summaryProfile&token={token}")
        if response.status_code == 200:
            result = response.json()
            banco.foto = result["results"][0]["logourl"]
            banco.shortname = result["results"][0]["shortName"]
            banco.longname = result["results"][0]["longName"]
            banco.currency = result["results"][0]["currency"]
            banco.priceEarnings = result["results"][0]["priceEarnings"]
        else:
            print("Erro ao fazer a requisição: ", response.status_code)
        
    except:
        return "Não deu!"
    return render_template("index.html", 
    nome = banco.nome,
    foto = banco.foto,
    shortname = banco.shortname,
    longname = banco.longname,
    currency=banco.currency,
    priceEarnings=banco.priceEarnings
    )

if __name__ == "__main__":
    app.run(debug=True)