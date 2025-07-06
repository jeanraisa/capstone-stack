from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load the model
model = joblib.load("model.pkl") 
scaler = joblib.load("scaler.pkl")  


app = FastAPI(
    title="Maternal Health Risk Prediction API",
    description="Predicts maternal risk levels (Low, Moderate, High) using trained ML model",
    version="1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputData(BaseModel):
    Age: float
    SystolicBP: float
    DiastolicBP: float
    BS: float
    BodyTemp: float
    HeartRate: float

@app.post("/predict")
def predict(data: InputData):
    features = np.array([[data.Age, data.SystolicBP, data.DiastolicBP, data.BS, data.BodyTemp, data.HeartRate]])
    features_scaled = scaler.transform(features)

    prediction = model.predict(features_scaled)[0]
    label_map = {0: "Low Risk", 1: "Moderate Risk", 2: "High Risk"}

    return {
        "predicted_class": int(prediction),
        "predicted_label": label_map[int(prediction)]
    }

