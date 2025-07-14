# Pregnancy Risk Level Prediction and Monitoting System

# Project Overview

This project aims to predict and monitor pregnancy risks using Machine Learning (ML) and mobile technologies. The system uses physiological data to make predictions and provides alerts for high-risk pregnancy. By analyzing user-inputted physiological data and the system provides personalized risk predictions and health insights to support early intervention and safer pregnancies.

# Machine Learning (ML) Part

# Data Collection

- Dataset: The project uses this [Maternal Health Risk](https://www.kaggle.com/datasets/csafrit2/maternal-health-risk-data)
- Features: The dataset includes features like age, body temperature, blood pressure, and more.

# Model Training

- Algorithm: Random Forest Classifier
- Hyperparameters:
  1. n_estimators=300
  2. random_state=42
  3. criterion=entropy
  4. max_depth=30,
  5. min_samples_leaf=5
- Training Process: The model was trained on 80% of the dataset and evaluated on the remaining 20%.

# Model Evaluation

- Accuracy: 74%
- F1 Score: 72%
- Precision: 72%
- Recall: 74%
- Confusion Matrix: Used to visualize true positives, false positives, etc.

# Moving the ML Model to Deployment

# Model Optimization

- Simplification for Embedded Use: The trained Random Forest model was pruned by reducing tree depth and limiting leaf nodes to ensure compatibility with edge deployment scenarios.

- Class Weighting: Custom class weights were used during training to handle class imbalance, especially improving predictions for moderate-risk cases.

# API Deployment with Hugging Face Spaces

The model was deployed using FastAPI and it was then hosted publicly on Hugging Face Spaces, enabling real-time predictions.

# Mobile Application Integration

# App Features

- Input Form: Allows healthcare input features like Age, Blood Pressure, Body Temperature, Heart Rate, etc.

- Risk Prediction: Sends data to the Hugging Face API and displays predicted risk level: Low, Moderate, or High.

# Tech Stack

- Frontend: React Native for iOS

- Backend: FastAPI hosted on Hugging Face Spaces

# Model-Mobile Integration Workflow

- Training & Export → `.pkl` model trained and saved.

- API Setup → FastAPI serves the model via Hugging Face.

- Mobile Interaction → App sends inputs and receives risk level.

# Real-Time Monitoring Workflow

- Data Collection: User inputs health metrics (e.g., age, blood pressure, blood sugar, temperature, heart rate) directly into the mobile application during prenatal or check-up sessions.

- Inference: Preprocessed inputs are sent via HTTP POST to the Hugging Face-hosted FastAPI endpoint, which loads the trained Random Forest model and returns a risk prediction in real time.

- Output: The predicted maternal health risk (Low, Moderate, High) is displayed in the mobile application interface with intuitive color codes and risk messages.

# Analysis

The trained model consistently achieved accuracy scores between 70–75%, with strong precision and F1 scores for low- and high-risk classifications. These results indicate that the model performs well in identifying clearly separable risk categories.These outcomes largely align with the project’s core objective: to develop a machine learning model for real-time maternal health risk prediction that is deployable and integrates well into a mobile application for antenatal care.

# Challenges and Solutions

- Class Imbalance: Used `class_weight='balanced'` for better generalization
- API Integration: Used FastAPI with JSON schema validation
- Prediction Latency: FastAPI reduced overhead for real-time performance
- Data Sensitivity: API performs stateless inference without storing inputs

# Future Enhancements

- Offline Prediction: Convert model to ONNX or TFLite for on-device inference.

- Multi-language UI: Support Kinyarwanda, French, and other local languages.

(Download the App)[https://testflight.apple.com/join/bD7WDzgf]
