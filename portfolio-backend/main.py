from flask import Flask, send_from_directory, jsonify, abort 
import time
import flask

from flask.helpers import flash
app = Flask(__name__)


projects = [
    {
        "id": 0,
        "title" : "Face Tracking Turret",
        "content" : "Arduino Turret following your face",
        "Image" : "api/Images/projects/Pong.png",
        "link": "https://github.com/LoredCast/pongai",
    },
    {
        "id": 1,
        "title" : "Pong AI",
        "content" : "Neuro Evolving Pong AI",
        "Image" : "api/Images/projects/Pong.png",
        "link": "https://github.com/LoredCast/pongai",
    },
    {
        "id": 2,
        "title" : "Command line Tuner and Pitch game",
        "content" : "CLI tool/game where you have to play the right frequency into your microphone. Detection works using Fast Fourier Transform.",
        "Image" : "api/Images/projects/FFT.png",
        "link": "https://github.com/LoredCast/SheetQuiz",
    },
]

app.config["CLIENT_IMAGES"] = "./static/client/"

@app.route("/api/getProjects", methods=["GET"])
def getProjects():
    return jsonify({"projects": projects})
    

@app.route("/api/Images/<path:path>")
def getImage(path):
    try:
        return send_from_directory(app.config["CLIENT_IMAGES"], filename=path, as_attachment=True)
    except FileNotFoundError:
        abort(404)
        






