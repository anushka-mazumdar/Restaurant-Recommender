from flask import Flask, request, jsonify, render_template
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity
import traceback

# Initialize Flask app
app = Flask(__name__)

# Load data and normalize city names
cleaned_data = pd.read_csv("cleaned_data.csv")

# Fix city name inconsistencies
cleaned_data['City'] = cleaned_data['City'].str.strip().str.title()  # Remove spaces, fix capitalization
cleaned_data['City'] = cleaned_data['City'].replace({'New Delhi': 'Delhi'})  # Convert "New Delhi" to "Delhi"

# Restrict dataset to Noida & Delhi
cleaned_data = cleaned_data[cleaned_data['City'].isin(['Noida', 'Delhi'])]

# Load models (only SVD and TF-IDF)
try:
    svd_model = pickle.load(open("svd_model.pkl", "rb"))
    tfidf_model = pickle.load(open("tfidf_model.pkl", "rb"))
except Exception as e:
    print(f"Error loading models: {e}")
    svd_model, tfidf_model = None, None

# Home page
@app.route('/')
def index():
    return render_template('ui.html', City=['Noida', 'Delhi'])

# Recommendation logic (Only SVD Model)
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Get user inputs
        location = request.form.get('location')
        cuisine = request.form.get('cuisine')
        rating = request.form.get('rating', 0)
        cost = request.form.get('cost', float('inf'))

        # Validate inputs
        if location not in ['Noida', 'Delhi']:
            return jsonify({'error': 'Please select either Noida or Delhi.'}), 400
        if not cuisine:
            return jsonify({'error': 'Cuisine is required.'}), 400
        try:
            rating = float(rating)
            cost = float(cost)
        except ValueError:
            return jsonify({'error': 'Invalid rating or cost value. Please enter numbers only.'}), 400

        # Strictly enforce maximum cost filtering
        filtered_data = cleaned_data[
            (cleaned_data['City'] == location) &
            (cleaned_data['Cuisines'].str.contains(cuisine, case=False, na=False)) &
            (cleaned_data['Aggregate rating'] >= rating) &
            (cleaned_data['Average Cost for two'].astype(float) <= cost)  
        ]

        # Debugging - Check if Delhi filter works
        if location == "Delhi":
            print("DEBUG: Delhi filter is applied.")
            print(filtered_data[['Restaurant Name', 'City']].head())

        if filtered_data.empty:
            print("Filtered Data is empty. No recommendations possible.")
            return render_template('results.html', message='No matching restaurants found.')

        # Use SVD Model for Recommendation (Content-Based)
        user_query = cuisine + " " + location
        query_vec = tfidf_model.transform([user_query])
        query_vec_reduced = svd_model.transform(query_vec)

        # Generate similarity scores with **filtered** dataset instead of full dataset
        filtered_vectors = svd_model.transform(tfidf_model.transform(filtered_data['Cuisines'] + " " + filtered_data['City']))
        sim_scores = cosine_similarity(query_vec_reduced, filtered_vectors).flatten()
        recommended_indices = sim_scores.argsort()[-5:][::-1]  # Get top 5 results

        recommendations = filtered_data.iloc[recommended_indices][['Restaurant Name', 'Cuisines', 'Aggregate rating', 'Average Cost for two']]

        return render_template('results.html', recommendations=recommendations.to_dict(orient='records'))

    except Exception as e:
        print(traceback.format_exc())  # Print full error traceback for debugging
        return jsonify({'error': f"An error occurred: {str(e)}"}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5500)
