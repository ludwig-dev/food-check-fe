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

    const[toggle, setToggle] = useState(false);

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

    if(!toggle) {
        return (
            <div style={{ marginTop: "2rem" }}>
                <button onClick={handleToggle}>Visa sökfält</button>
            </div>
        );
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <button onClick={handleToggle}>Dölj sökfält</button>
            <h4>🔍 Sök och lägg till ingrediens</h4>

            <input
                type="text"
                placeholder="Sök efter livsmedel"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Sök</button>

            {loading && <p>Söker...</p>}

            <ul>
                {searchResults.map((item) => (
                    <li key={item.id}>
                        {item.name}
                        <input
                            type="number"
                            placeholder="Gram"
                            value={amountMap[item.id] || ""}
                            onChange={(e) =>
                                setAmountMap({ ...amountMap, [item.id]: Number(e.target.value) })
                            }
                        />
                        <button onClick={() => handleAdd(item.id)}>Lägg till</button>
                    </li>
                ))}


            </ul>
        </div>
    );
};

export default FoodSearchAndAdd;
