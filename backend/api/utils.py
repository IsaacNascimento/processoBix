from django.contrib.auth.models import User
import jwt

def jwt_payload_handler(user, token):
    tokenDecoded = jwt.decode(token, 'secret', algorithms=['HS256'], verify=False, options={'verify_signature': False})
    user_id = 0

    if tokenDecoded:
        user_id = tokenDecoded['user_id']
    
    try:
        usuarioLogado = User.objects.filter(username=user, id=user_id).values()
        obj = {}

        if usuarioLogado.exists():
           
           obj = {
             'id': user_id,
             'isAdmin': usuarioLogado[0]['is_staff'],
             'email': usuarioLogado[0]['email'],
             'username': usuarioLogado[0]['username'],
            }
        
        return obj;
    
    except jwt.exceptions.InvalidTokenError:
        return None


def extract_jwt_token(auth_header):
   
    if auth_header.startswith('Bearer '):
        
        parts = auth_header.split(' ')
        
        if len(parts) == 2:
            
            return parts[1]
    
    return None