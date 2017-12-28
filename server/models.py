# models.py
# created by James L 07/07/2017

# file for all our database related python objects, used for ORM

from server.app_file import db
import datetime

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(
            self, username, email,
            created_at=datetime.datetime.utcnow()):
        self.username = username
        self.email = email
        self.created_at = created_at
