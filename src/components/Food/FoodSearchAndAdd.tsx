import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { searchFood } from "../../redux/Slices/foodSlice";
import { addIngredient } from "../../redux/Slices/recipeSlice";
import { useParams } from "react-router-dom";

const FoodSearchAndAdd = () => {
    const { id } = useParams(); // recipeId from route
    const recipeId = Number(id);

    const dispatch = useDispatch<AppDispatch>();
    const { searchResults, loading } = useSelector((state: RootState) => state.food);

    const [query, setQuery] = useState("");
    const [amountMap, setAmountMap] = useState<{ [key: number]: number }>({});

    const [toggle, setToggle] = useState(false);

    const handleSearch = () => {
        if (query.trim()) dispatch(searchFood(query));
    };

    const handleAdd = (foodId: number) => {
        const amountInGrams = amountMap[foodId];
        if (!amountInGrams || amountInGrams <= 0) return;

        dispatch(addIngredient({ recipeId, foodId, amountInGrams }));
        setAmountMap({ ...amountMap, [foodId]: 0 }); // reset
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    if (!toggle) {
        return (
            <div className="mt-8">
                <button
                    onClick={handleToggle}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Visa sökfält
                </button>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <button
                onClick={handleToggle}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Dölj sökfält
            </button>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
                🔍 Sök och lägg till ingrediens
            </h4>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Sök efter livsmedel"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    Sök
                </button>
            </div>
            {loading && <p className="text-gray-500 mb-4">Söker...</p>}
            <ul className="space-y-4">
                {searchResults.map((item) => (
                    <li
                        key={item.id}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-md flex flex-col sm:flex-row justify-between items-center"
                    >
                        <div className="text-gray-800 font-medium">{item.name}</div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <input
                                type="number"
                                placeholder="Gram"
                                value={amountMap[item.id] || ""}
                                onChange={(e) =>
                                    setAmountMap({
                                        ...amountMap,
                                        [item.id]: Number(e.target.value),
                                    })
                                }
                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                onClick={() => handleAdd(item.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Lägg till
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodSearchAndAdd;
