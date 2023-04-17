from flask import Flask, request
import json
app = Flask(__name__)

with open("../data/saved_data.json") as file:
	data = json.load(file)

@app.route("/cities")
def get_cities():
	name = request.args.get('name')
	ret = "Hello, " + name
	return ret