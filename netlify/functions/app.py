from app import app  # Importa o Flask da aplicação principal
from serverless_wsgi import handle_request  # Utiliza o servidor WSGI para funções serverless

def handler(event, context):
    """Função handler que será chamada pelo Netlify"""
    return handle_request(app, event, context)
