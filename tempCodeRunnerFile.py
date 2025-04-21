from flask import Flask, request, jsonify, render_template
import pandas as pd
import pickle

# Initialize the Flask app
app = Flask(__name__)
cleaned_data = pd.read_csv("cleaned_data.csv")  # Ensure this file exists in the same directory

# Load models and data
pipe = pickle.load(open('svd_model.pkl', 'rb'))

# Extract unique options
@app.route('/')
def index():
    City = ['Noida', 'Delhi']
    Cuisines = sorted(cleaned_data['Cuisines'].dropna().unique().tolist())
    return render_template('ui.html', City=City, Cuisines=Cuisines)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Retrieve JSON input data
        data = request.json
        location = data.get('location')
        cuisine = data.get('cuisine')
        rating = data.get('rating', 0)
        cost = data.get('cost', float('inf'))

        # Validate inputs
        if not all([location, cuisine]):
            return jsonify({'error': 'Location and Cuisine are required fields.'}), 400

        try:
            rating = float(rating)
            cost = float(cost)
        except ValueError:
            return jsonify({'error': 'Invalid rating or cost value. Please ensure they are numeric.'}), 400

        # Filter data based on user input
        filtered_data = cleaned_data[
            (cleaned_data['City'] == location) &
            (cleaned_data['Cuisines'].str.contains(cuisine, case=False, na=False)) &
            (cleaned_data['Aggregate rating'] >= rating) &
            (cleaned_data['Average Cost for two'] <= cost)
        ]

        # Prepare recommendations
        recommendations = filtered_data[['Restaurant Name', 'Cuisines', 'Aggregate rating', 'Average Cost for two']]
        recommendations = recommendations.to_dict(orient='records')

        if recommendations:
            return jsonify({'recommendations': recommendations})
        else:
            return jsonify({'message': 'No matching restaurants found.'})

    except Exception as e:
        return jsonify({'error': f"An error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5500)
