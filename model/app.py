from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model
with open('NB.pkl', 'rb') as file:
    model = pickle.load(file)

# Define endpoint for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from request
    if request.method == 'POST':
        data = request.get_json()
        N = int(data['nitrogen'])
        P = int(data['phosphorus'])
        K = int(data['potassium'])
        humidity = float(data['humidity'])
        temperature = float(data['temperature'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])

    input_data = np.array([[N, P, K, humidity, temperature, ph, rainfall]])
    my_prediction = model.predict(input_data)
    final_prediction = my_prediction[0]
    return jsonify({'prediction': final_prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
