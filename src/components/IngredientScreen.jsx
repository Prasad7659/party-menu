import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { DISHES, INGREDIENTS } from "../data";

export default function IngredientScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const dish = location.state?.dish || DISHES.find(d => String(d.id) === id);
  const ingredients = INGREDIENTS[id] || [];

  if (!dish) return <p className="p-6">Dish not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="text-blue-600 underline mb-3">
        Back
      </button>
      <h2 className="text-xl font-bold mb-2">{dish.name}</h2>
      <p className="text-gray-600 mb-4">{dish.description}</p>
      <h3 className="font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside">
        {ingredients.length === 0 && <li>No ingredients available</li>}
        {ingredients.map((ing, i) => (
          <li key={i}>
            <strong>{ing.name}</strong> — {ing.qty}
          </li>
        ))}
      </ul>
    </div>
  );
}
