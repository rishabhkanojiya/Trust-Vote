from datetime import datetime
from db import db


class Voter(db.Model):
    __tablename__ = "voters"

    id = db.Column(db.Integer, primary_key=True)
    ssn = db.Column(db.String(11), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

    def json(self):
        return {
            "id": self.id,
            "ssn": self.ssn,
            "name": self.name,
            "date_of_birth": str(self.date_of_birth),
            "registration_date": str(self.registration_date),
        }

    def __repr__(self):
        return f"<Voter {self.name}>"
