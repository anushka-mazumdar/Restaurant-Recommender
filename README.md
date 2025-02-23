# 🍽️ Restaurant Recommender  

A **Flask-powered** restaurant recommendation system that helps users find the best restaurants in **Noida** and **Delhi** based on cuisine, rating, and budget. The system **uses an SVD-based model by default** for recommendations.  

## 🚀 Features  

✔️ **City Selection** – Choose between **Noida** and **Delhi**.  
✔️ **Cuisine Filtering** – Get recommendations based on your preferred cuisine.  
✔️ **Rating & Budget Filters** – Set a minimum rating and maximum cost for recommendations.  
✔️ **Machine Learning-Powered** – Uses **TF-IDF** vectorization & **SVD** for similarity-based ranking.  
✔️ **Web Interface** – A simple and intuitive UI built using **Flask & HTML**.  

## 📂 Project Structure  

```
📂 Restaurant_Recommender/
│── templates/               # HTML templates for UI
│   ├── ui.html              # Main UI page
│   ├── results.html         # Results page
│   ├── food.jpg             # UI Image
│── app.py                   # Flask application
│── cleaned_data.csv         # Preprocessed dataset
│── svd_model.pkl            # SVD model (default recommendation model)
│── tfidf_model.pkl          # TF-IDF vectorizer
│── collab_model.pkl         # (Optional) Collaborative filtering model (not used by default)
│── Res_recom.ipynb          # Jupyter notebook for data analysis & modeling
│── tempCodeRunnerFile.py    # Temporary code runner file (can be ignored)
```

## 🛠️ Installation  

1️⃣ Clone the repository:  
```bash
git clone https://github.com/yourusername/restaurant-recommender.git  
cd restaurant-recommender
```

2️⃣ Install dependencies:  
```bash
pip install -r requirements.txt
```

3️⃣ Run the Flask app:  
```bash
python app.py
```

4️⃣ Open your browser and go to:  
```
http://127.0.0.1:5500/
```

## ⚙️ How It Works  

- **Preprocessed Data:** The system uses `cleaned_data.csv`, where restaurant details are filtered for Noida & Delhi.  
- **TF-IDF Vectorization:** Converts restaurant cuisines and city into numerical representations.  
- **SVD (Singular Value Decomposition) - Default Model:** Reduces dimensionality for better similarity matching.  
- **Cosine Similarity:** Compares user input with restaurant data to suggest the best matches.  

## 📝 Future Improvements  

🔹 **Collaborative Filtering:** Implement user-based recommendations.  
🔹 **More Cities:** Expand beyond Noida & Delhi.  
🔹 **Live User Feedback:** Allow users to rate recommendations.  
