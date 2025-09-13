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
                        ? "bg-blue-600 text-white"
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
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={vegFilter} onChange={() => setVegFilter(v => !v)} />
                  Veg
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={nonVegFilter} onChange={() => setNonVegFilter(v => !v)} />
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
