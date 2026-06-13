# 🍽️CUIZINE RECOMMENDER

An intelligent restaurant recommendation system that helps users discover restaurants based on cuisine preferences, location, budget, and rating filters.

Built with a modern React frontend and a FastAPI backend powered by machine learning techniques including TF-IDF vectorization and Truncated SVD for content-based recommendation.

---

## ✨ Features

### Smart Restaurant Search

* Search restaurants by cuisine
* Filter by city (Delhi / Noida)
* Filter by budget
* View ranked recommendations based on similarity matching

### Recommendation Engine

* TF-IDF based feature extraction
* Truncated SVD dimensionality reduction
* Cosine similarity ranking
* Content-based recommendation system

### Interactive Filters

* Rating filter (1+ to 4.5+)
* Show Top 5, Top 10, Top 15, or All Results
* Dynamic recommendation count

### Modern User Experience

* Responsive React interface
* Glassmorphism-inspired UI
* Animated gradient background
* Real-time recommendation loading states
* Searchable cuisine dropdown

---

## 🏗️ Project Architecture

```text
Savora-AI/
│
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── data/
│   │   └── cleaned_data.csv
│   ├── trained_models/
│   │   ├── tfidf_model.pkl
│   │   └── svd_model.pkl
│   └── pyproject.toml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🧠 Machine Learning Pipeline

### Data Preparation

Restaurant metadata is cleaned and processed from the source dataset.

### Feature Engineering

Restaurant cuisines and locations are transformed into textual features using:

* TF-IDF Vectorization
* Truncated SVD

### Recommendation Generation

1. User enters cuisine, location, and budget.
2. Restaurants are filtered by city and cost.
3. TF-IDF transforms user preferences into feature vectors.
4. SVD reduces dimensionality.
5. Cosine similarity ranks restaurants.
6. Results are returned in descending relevance order.

---

## ⚙️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript

### Backend

* FastAPI
* Uvicorn
* Pandas
* Scikit-Learn
* Pydantic

### Machine Learning

* TF-IDF Vectorizer
* Truncated SVD
* Cosine Similarity

---

## 🚀 Running the Project

### Clone Repository

```bash
git clone https://github.com/anushka-mazumdar/Restaurant-Recommender.git

cd Restaurant-Recommender
```

---

### Backend Setup

```bash
cd backend

uv sync
```

Start the API server:

```bash
uv run uvicorn app.main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

### Get Recommendations

```http
POST /recommend
```

Request:

```json
{
  "location": "Noida",
  "cuisine": "Italian",
  "cost": 2000
}
```

Response:

```json
{
  "recommendations": [
    {
      "Restaurant Name": "Restaurant Name",
      "Cuisines": "Italian, Pizza",
      "Aggregate rating": 4.3,
      "Average Cost for two": 1800
    }
  ]
}
```

---

### Get Available Cuisines

```http
GET /cuisines
```

Returns all cuisines available in the dataset.

---

## 🎯 Future Improvements

* Authentication and user profiles
* Restaurant bookmarking
* Recommendation history
* Hybrid recommendation engine
* Collaborative filtering
* Restaurant images and maps integration
* Cloud deployment
* Docker support

---

## 👩‍💻 Author

**Anushka Mazumdar**

AI/ML Developer

GitHub:
https://github.com/anushka-mazumdar

---

## License

This project is intended for educational and portfolio purposes.
