import React, { useMemo } from "react";
import DishCard from "./DishCard";

export default function DishList({
  dishes,
  activeTab,
  query,
  vegFilter,
  nonVegFilter,
  selectedIds,
  onToggleSelect,
  onIngredientClick
}) {
  const filtered = useMemo(() => {
    return dishes.filter(d => {
      if (d.mealType !== activeTab) return false;
      if (!d.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (!vegFilter && d.type === "VEG") return false;
      if (!nonVegFilter && d.type === "NON-VEG") return false;
      return true;
    });
  }, [dishes, activeTab, query, vegFilter, nonVegFilter]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
      {filtered.length === 0 ? (
        <p className="text-gray-500">No dishes found</p>
      ) : (
        filtered.map(d => (
          <DishCard
            key={d.id}
            dish={d}
            isSelected={selectedIds.has(d.id)}
            onToggle={() => onToggleSelect(d.id)}
            onIngredient={() => onIngredientClick(d)}
          />
        ))
      )}
    </div>
  );
}
