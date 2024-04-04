from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from resources.vote import voter_resource
from config import POSTGRES_TRUST_VOTE_READ_WRITE


print(POSTGRES_TRUST_VOTE_READ_WRITE)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = POSTGRES_TRUST_VOTE_READ_WRITE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

app.register_blueprint(voter_resource)

if __name__ == "__main__":
    from db import db

    db.init_app(app)
    app.run(port=9069)
