import React, { useState, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DISHES } from "./data";
import DishList from "./components/DishList";
import IngredientScreen from "./components/IngredientScreen";
import SummaryBar from "./components/SummaryBar";

const MEAL_TABS = ["STARTER", "MAIN COURSE", "DESSERT", "SIDES"];

export default function App() {
  const [activeTab, setActiveTab] = useState("MAIN COURSE");
  const [query, setQuery] = useState("");
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const navigate = useNavigate();

  const countsPerCategory = useMemo(() => {
    const counts = {};
    MEAL_TABS.forEach(t => counts[t] = 0);
    for (const id of selectedIds) {
      const dish = DISHES.find(d => d.id === id);
      if (dish && counts[dish.mealType] !== undefined) counts[dish.mealType]++;
    }
    return counts;
  }, [selectedIds]);

  function toggleSelect(id) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleIngredientClick(dish) {
    navigate(`/ingredient/${dish.id}`, { state: { dish } });
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Party Menu Selection</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {MEAL_TABS.map(tab => (
                  <button
                    key={tab}
                    className={`px-3 py-1 rounded-lg border ${
                      activeTab === tab
                        ? "bg-orange-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                    onClick={() => { setActiveTab(tab); setQuery(""); }}
                  >
                    {tab} {countsPerCategory[tab] ? `(${countsPerCategory[tab]})` : ""}
                  </button>
                ))}
              </div>

              {/* Search + Filters */}
              <div className="flex items-center gap-4 mb-4">
                <input
                  className="flex-1 border rounded-lg px-3 py-2"
                  placeholder={`Search ${activeTab}...`}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
               {/* Veg Toggle */}
<label className="flex items-center gap-2 text-sm cursor-pointer">
  <div
    onClick={() => setVegFilter(v => !v)}
    className="relative w-12 h-6 flex items-center rounded-full cursor-pointer border border-green-600 transition-colors"
    style={{ backgroundColor: vegFilter ? "#16a34a22" : "transparent" }}
  >
    <div
      className={`absolute left-1 flex items-center justify-center w-4 h-4 rounded-sm border-2 border-green-600 bg-white transition-transform ${
        vegFilter ? "translate-x-6" : ""
      }`}
    >
      {/* Circle inside square */}
      <div
        className={`w-2 h-2 rounded-full border border-green-600 ${
          vegFilter ? "bg-green-600" : "bg-green-600"
        }`}
      ></div>
    </div>
  </div>
  Veg
</label>

{/* Non-Veg Toggle */}
<label className="flex items-center gap-2 text-sm cursor-pointer">
  <div
    onClick={() => setNonVegFilter(v => !v)}
    className="relative w-12 h-6 flex items-center rounded-full cursor-pointer border border-red-600 transition-colors"
    style={{ backgroundColor: nonVegFilter ? "#dc262622" : "transparent" }}
  >
    <div
      className={`absolute left-1 flex items-center justify-center w-4 h-4 rounded-sm border-2 border-red-600 bg-white transition-transform ${
        nonVegFilter ? "translate-x-6" : ""
      }`}
    >
      {/* Arrow inside square */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 17"
        className="w-3 h-3"
        fill={nonVegFilter ? "red" : "red"}
        stroke="red"
        strokeWidth="2"
      >
        <path d="M12 4l6 10H6z" /> {/* Upward arrow */}
      </svg>
    </div>
  </div>
  Non-Veg
</label>

              </div>

              {/* Dish List */}
              <DishList
                dishes={DISHES}
                activeTab={activeTab}
                query={query}
                vegFilter={vegFilter}
                nonVegFilter={nonVegFilter}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onIngredientClick={handleIngredientClick}
              />

              {/* Summary */}
              <SummaryBar
                countsPerCategory={countsPerCategory}
                totalSelected={selectedIds.size}
              />
            </>
          }
        />
        <Route path="/ingredient/:id" element={<IngredientScreen />} />
      </Routes>
    </div>
  );
}
