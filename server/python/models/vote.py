from db import db


class Candidate(db.Model):
    __tablename__ = "candidates"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    level = db.Column(db.String(100), nullable=False)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
        }

    def getLevel(self):
        return self.level

    def __repr__(self):
        return f"<Candidate {self.name}>"
