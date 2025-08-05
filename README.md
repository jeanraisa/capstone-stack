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
  

[Download the App](https://testflight.apple.com/join/bD7WDzgf)

[Mobile App demo](https://youtu.be/KK65lhOEm18?si=HmZX8TsfPFLc4gtv)

# Running the App locally
### Clone the project
```
git clone https://github.com/jeanraisa/capstone-stack.git
cd capstone-stack
```

### Project Structure
The project follows a **monorepo structure** using **Turborepo** with the following components:
```
capstone-stack/
├── apps/                    # Main applications
│   ├── api/                # Backend API (Hono + tRPC + Drizzle ORM)
│   ├── fastapi/            # ML Prediction API (FastAPI + scikit-learn)
│   └── mobile/             # React Native iOS app
├── packages/               # Shared packages
│   ├── tsconfig/          # Shared TypeScript configurations
│   └── utils/             # Shared utility functions
├── patches/               # Package patches (e.g., react-native-health)
└── turbo.json   
```

### Prerequisites

1. **Bun**
   ```bash
   # Install Bun (if not already installed)
   curl -fsSL https://bun.sh/install | bash
   
   # Verify installation
   bun --version
   ```
2. **PostgreSQL Database**
  - create a [supabase](https://supabase.com/dashboard) project
  - in the top navigation bar click `connect` > `ORMS` > in the tool dropdown choose `drizzle`
  - set the DATABASE_URL as the value for both `DATABASE_URL` and `DATABASE_SESSION_POOLER` in `apps/api/.env-template` it should be of this format `postgresql://postgres.[PROJECT-NAME]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
    
3. **FastApi on HuggingFace ML**
  - the apps/fastapi app is deployed on hugging face to avoid running it locally(memory and space consumming)
  - to run predictions you will need to run it on a REST API, create a hugging face [account](https://huggingface.co/) and duplicate my huggingface [space](https://huggingface.co/spaces/rayray1234/maternal-risk-api)
  - create an `ACCESS TOKEN` for your account with all read and write permissions for the new space duplicated above [here](https://huggingface.co/settings/tokens)
  - set the credentials in `apps/api/.env-template` `HUGGING_FACE_TOKEN`: the ACCESS_TOKEN created and `HUGGING_FACE_SPACE`:  as `https://username-spacename.hf.space` example for my space above it is `https://rayray1234-maternal-risk-api.hf.space`
    
3. **iOS Environment**
  - **Create an apple developer account**: you will need an apple developer [account](https://developer.apple.com/account) will a valid license to run the app locally 
  - **Install Xcode** 
    open up the Mac App Store, search for [Xcode](https://apps.apple.com/us/app/xcode/id497799835), and click Install (or Update if you have it already).
  - **Install Xcode Command Line Tools**
    Open Xcode, choose Settings... from the Xcode menu (or press `cmd ⌘ + ,`). Go to the Locations and install the tools by selecting the most recent version in the Command Line Tools dropdown.
  - **Install an iOS Simulator in Xcode**
    To install an iOS Simulator, open Xcode > Settings... > Components, and under Platform Support > iOS ..., click Get.

4. **Withings credentials (optional)**
  - if you want to use withings you can create a client [here](https://developer.withings.com/dashboard/)
  - they will provide credentials set them in `apps/api/.env-template` `WITHINGS_CLIENT_SECRET` and `WITHINGS_CLIENT_ID`

5. **Login with apple (optional)**
  - if you want to login with apple you can follow this guide [here](https://www.better-auth.com/docs/authentication/apple)
  - add you generated apple client secret and client id in `apps/api/.env-template` `APPLE_CLIENT_SECRET`, `APPLE_CLIENT_ID`

6. **then rename env-template in `apps/api/.env-template` to `apps/api/.env`**

### Install all dependencies
In the project root
```
 bun install
```

### Run Database Migrations
 Navigate to api directory apps/api
```bash
   bun run db:migrate
```

### Run API app
```bash
  bun run dev
```

### Build and run the mobile app
Open a new terminal navigate to mobile directory apps/mobile
```bash
  bun run prebuild
```
```bash
  bun run dev
```
This will install and open the app on a simulator to use to login with apple and use apple health you will need to connect a physical device in xcode [here](https://developer.apple.com/documentation/xcode/devices-and-simulator)
