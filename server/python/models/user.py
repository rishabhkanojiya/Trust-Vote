from datetime import datetime
from db import db


class User(db.Model):
    __tablename__ = "users"

    _id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(255))
    lastName = db.Column(db.String(255))
    state = db.Column(db.String(255))
    city = db.Column(db.String(255))
    ssn = db.Column(db.String(9), nullable=False)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updatedAt = db.Column(db.DateTime, onupdate=datetime.utcnow, nullable=False)

    def json(self):

        return {
            "_id": self._id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "state": self.state,
            "city": self.city,
            "email": self.email,
            "ssn": self.ssn,
            "createdAt": self.createdAt.isoformat(),
            "updatedAt": self.updatedAt.isoformat(),
        }

    def getSSN(self):
        return self.ssn

    def __repr__(self):
        return f"<User(id={self._id}, email='{self.email}')>"
