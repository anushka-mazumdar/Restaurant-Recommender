import pandas as pd
import pickle
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

app = FastAPI(title="Restaurant Recommender API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use Pathlib for robust path resolution
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "cleaned_data.csv"
SVD_MODEL_PATH = BASE_DIR / "trained_models" / "svd_model.pkl"
TFIDF_MODEL_PATH = BASE_DIR / "trained_models" / "tfidf_model.pkl"

# Pydantic Model for JSON input (Rating removed)
class QueryRequest(BaseModel):
    location: str
    cuisine: str
    cost: float = float("inf")

# Load data and models
cleaned_data = pd.read_csv(DATA_PATH)
cleaned_data['City'] = cleaned_data['City'].str.strip().str.title().replace({'New Delhi': 'Delhi'})
cleaned_data = cleaned_data[cleaned_data['City'].isin(['Noida', 'Delhi'])]

with open(SVD_MODEL_PATH, "rb") as f: svd_model = pickle.load(f)
with open(TFIDF_MODEL_PATH, "rb") as f: tfidf_model = pickle.load(f)

@app.post("/recommend")
async def recommend(query: QueryRequest):
    try:
        # Normalize inputs
        location = query.location.strip().title()
        cuisine = query.cuisine.strip()

        print("\n========== NEW REQUEST ==========")
        print(f"Location: {location}")
        print(f"Cuisine: {cuisine}")
        print(f"Cost: {query.cost}")

        # Step 1: City filter
        city_data = cleaned_data[
            cleaned_data["City"].str.strip().str.title() == location
        ]

        print(f"After city filter: {len(city_data)}")

        # Step 2: Cuisine filter
        if cuisine:
            cuisine_data = city_data[
                city_data["Cuisines"].str.contains(
                    cuisine,
                    case=False,
                    na=False
                )
            ]
        else:
            cuisine_data = city_data

        print(f"After cuisine filter: {len(cuisine_data)}")

        # Step 3: Cost filter
        cost_data = cuisine_data[
            pd.to_numeric(
                cost_data := cuisine_data["Average Cost for two"],
                errors="coerce"
            ) <= float(query.cost)
        ]

        print(f"After cost filter: {len(cost_data)}")

        if cost_data.empty:
            return {
                "recommendations": [],
                "message": "No matching restaurants found"
            }

        # Recommendation Engine
        user_query = f"{cuisine} {location}"

        query_vec = tfidf_model.transform([user_query])
        query_vec_reduced = svd_model.transform(query_vec)

        filtered_vectors = svd_model.transform(
            tfidf_model.transform(
                cost_data["Cuisines"] + " " + cost_data["City"]
            )
        )

        sim_scores = cosine_similarity(
            query_vec_reduced,
            filtered_vectors
        ).flatten()

        # Return ALL recommendations ranked by similarity
        recommended_indices = sim_scores.argsort()[::-1]

        recommendations = cost_data.iloc[
            recommended_indices
        ][[
            "Restaurant Name",
            "Cuisines",
            "Aggregate rating",
            "Average Cost for two"
        ]]

        return {
            "recommendations": recommendations.to_dict(
                orient="records"
            ),
            "count": len(recommendations)
        }

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.get("/cuisines")
async def get_cuisines():
    cuisines = set()

    for row in cleaned_data["Cuisines"].dropna():
        for cuisine in str(row).split(","):
            cuisines.add(cuisine.strip())

    return sorted(list(cuisines))