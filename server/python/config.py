from dotenv import load_dotenv
import os


load_dotenv()

POSTGRES_TRUST_VOTE_READ_WRITE = os.getenv("POSTGRES_TRUST_VOTE_READ_WRITE")
JWT_SECRET = os.getenv("JWT_SECRET")
