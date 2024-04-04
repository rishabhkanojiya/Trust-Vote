from db import db


class Candidate(db.Model):
    __tablename__ = "candidates"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def json(self):
        return {"id": self.id, "name": self.name, "description": self.description}

    def __repr__(self):
        return f"<Candidate {self.name}>"
