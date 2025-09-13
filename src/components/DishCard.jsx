import React from "react";

export default function DishCard({ dish, isSelected, onToggle, onIngredient }) {
  return (
    <div className={`p-4 rounded-lg border shadow-sm bg-white ${isSelected ? "ring-2 ring-blue-400" : ""}`}>
      <div className="h-32 bg-gray-100 flex items-center justify-center rounded mb-3">
        {dish.image ? (
          <img src={dish.image} alt={dish.name} className="object-cover h-full w-full rounded" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold">{dish.name}</h3>
        <span className="text-xs px-2 py-0.5 border rounded">{dish.type}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
        >
          {isSelected ? "Remove" : "Add"}
        </button>
        <button
          onClick={onIngredient}
          className="text-blue-600 underline text-sm"
        >
          Ingredient
        </button>
      </div>
    </div>
  );
}
