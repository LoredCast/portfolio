from flask import Flask, send_from_directory, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from flask.helpers import flash
from flask_login import login_user, login_required, logout_user, current_user
import flask

import re
import time

from keeper.models import User, Transaction
from keeper import app, db, bcrypt


projects = [
    {
        "id": 0,
        "title": "Electron Soundboard",
        "content": "Nice looking Soundboard with recording and hotkey functionality built with Electron (react/typescript).",
        "Image": "api/Images/projects/soundboard.png",
        "link": "https://github.com/LoredCast/soundboard",
    },
    {
        "id": 1,
        "title": "Pong AI",
        "content": "Neuro Evolving Pong AI implemented with the python NEAT algorithm and library. In only a few generation, a fluid gameplay is possible",
        "Image": "api/Images/projects/Pong-min.png",
        "link": "https://github.com/LoredCast/pongai",
    },
    {
        "id": 2,
        "title": "Command line Tuner and Pitch game",
        "content": "CLI tool/game where you have to play the right frequency into your microphone. Detection works using Fast Fourier Transform.",
        "Image": "api/Images/projects/FFT-min.png",
        "link": "https://github.com/LoredCast/SheetQuiz",
    },
]

app.config["CLIENT_IMAGES"] = "./static/client/"


@app.route("/api/getProjects", methods=["GET"])
def getProjects():
    return jsonify({"projects": projects})


@app.route("/api/Images/<path:path>", methods=["GET"])
def getImage(path):
    try:
        return send_from_directory(app.config["CLIENT_IMAGES"], filename=path, as_attachment=True)
    except FileNotFoundError:
        abort(404)


@app.route("/api/createUser", methods=["POST"])
def create_user():
    post = request.get_json()
    try:
        name = post["username"]
        if re.search(r"\s", name):
            return("Creation failed! No whitespaces in usernames allowed!", 400)
        mail = post["mail"]
        if not re.fullmatch(r"[^@]+@[^@]+\.[^@]+", mail):
            return("Creation failed! Non valid email pattern given", 400)

        password = post["password"]
        if not password:
            return("Creation failed! Password can't be empty!,", 400)

        password = bcrypt.generate_password_hash(password)

        user = User(name=name, email=mail, password=password)
        try:
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            return("Creation failed! Email already taken!", 409)

        return(f"Success! User '{name}' created! {User.query.all()}", 200)
    except Exception as e:
        print('{"username":"username", "mail": "mail", "password": "password"}', e)
        abort(400)


@app.route("/api/login", methods=["POST"])
def login():
    post = request.get_json()
    try:
        email = post["email"]
        password = post["password"]
        user = User.query.filter_by(email=email).first()
        remember = post["remember"]
        if bcrypt.check_password_hash(user.password, password):
            login_user(user, remember=remember)
            return("login succesful", 200)
    except Exception as e:
        return(f"{e}", 400)


@app.route("/api/logout", methods=["GET", "POST"])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return("Logout Succesful", 200)
    else:
        return("You need to be logged in to log out!", 401)
