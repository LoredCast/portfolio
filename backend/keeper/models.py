from flask_login import UserMixin
from keeper import db
from datetime import datetime 

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=True)
    password = db.Column(db.String(60), nullable=True)
    transactions = db.relationship('Transaction', backref="user", lazy=True)
    def __repr__(self):
        return f"User(ID: {self.id}, {self.name})"


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    renewal = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, primary_key=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __repr__(self):
        return f"Transaction({self.date}: {self.name}, amount: EUR {self.amount})"
