from functools import wraps
from flask import request
from utils.error_parser import parse_error
from config import JWT_SECRET
import jwt


def authenticate_request(func):
    print("in Wrapper")

    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            token = request.cookies.get("token")

            if not token:
                return parse_error("Access denied | Please Login Again")

            decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user_id = decoded.get("userId")
        except jwt.ExpiredSignatureError:
            return parse_error("Token has expired")
        except jwt.InvalidTokenError:
            return parse_error("Invalid token")

        return func(*args, **kwargs)

    return wrapper
