from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Live data from ESP8266 for Bus 1
bus1_data = {
    "lat": 0.0,
    "lng": 0.0,
    "seats": [0, 0]  # 2 sensors: 0 = vacant, 1 = occupied
}

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/bus1page')
def bus1_page():
    return render_template("bus1.html")

@app.route('/bus2page')
def bus2_page():
    return render_template("bus2.html")

@app.route('/bus3page')
def bus3_page():
    return render_template("bus3.html")

@app.route('/bus1', methods=['GET'])
def get_bus1_data():
    return jsonify(bus1_data)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    bus1_data["lat"] = data.get("lat", 0.0)
    bus1_data["lng"] = data.get("lng", 0.0)
    bus1_data["seats"] = data.get("seats", [0, 0])
    return "Data Received"

if __name__ == '__main__':
    # Ensuring the Flask app listens on all interfaces (0.0.0.0) and port 5000
    app.run(debug=True, host="0.0.0.0", port=5000)
