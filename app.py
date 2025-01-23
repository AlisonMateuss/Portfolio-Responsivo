import os
from flask import Flask, jsonify, render_template, redirect, request, flash, url_for
from flask_mail import Mail, Message
from config import email, senha

# Configuração do Flask
app = Flask(__name__)
app.secret_key = 'alison'

# Configurações do Flask-Mail
mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": email,
    "MAIL_PASSWORD": senha
}

app.config.update(mail_settings)
mail = Mail(app)

class Contato:
    def __init__(self, nome, email, mensagem):
        self.nome = nome
        self.email = email
        self.mensagem = mensagem

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send():
    if request.method == 'POST':
        try:
            formContato = Contato(
                request.form["nome"],
                request.form["email"],
                request.form["mensagem"]
            )
            msg = Message(
                subject=f'{formContato.nome} te enviou uma mensagem no portfolio',
                sender=app.config.get("MAIL_USERNAME"),
                recipients=['alisonn2077@gmail.com', app.config.get("MAIL_USERNAME")],
                body=f'''
                {formContato.nome} com o e-mail {formContato.email}, te enviou a seguinte mensagem:
                {formContato.mensagem}
                '''
            )
            mail.send(msg)
            flash('Mensagem enviada com sucesso!')
        except Exception as e:
            flash(f'Erro ao enviar a mensagem: {str(e)}')
            return redirect(url_for('index'))  # Certifique-se de retornar ao índice se algo falhar
        
        return redirect(url_for('index'))  # Redireciona para a página principal após o envio da mensagem

if __name__ == "__main__":
    app.run(debug=True)
