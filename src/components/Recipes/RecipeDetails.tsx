import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removeIngredient } from "../../redux/Slices/recipeSlice";
import { fetchNutritionForRecipe } from "../../redux/Slices/nutritionSlice";
import FoodSearchAndAdd from "../Food/FoodSearchAndAdd";
import NutritionTable from "./NutritionTable";
import { useRecipe } from "./useRecipe";

interface Ingredient {
    foodId: number;
    foodName: string;
    amountInGrams: number;
}

export interface RecipeDetailsData {
    id: number;
    name: string;
    ingredients: Ingredient[];
}

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { recipe, loading, setRecipe } = useRecipe(id!);
    const nutrition = useSelector((state: RootState) => state.nutrition.nutrition);

    const handleRemoveIngredient = (foodId: number) => {
        if (recipe) {
            dispatch(removeIngredient({ recipeId: recipe.id, foodId }));
            setRecipe((prev) =>
                prev ? { ...prev, ingredients: prev.ingredients.filter((ing) => ing.foodId !== foodId) } : null
            );
        }
    };

    const handleLoadNutrition = () => {
        if (id) dispatch(fetchNutritionForRecipe(parseInt(id)));
    };

    if (loading) return <p>Laddar recept...</p>;
    if (!recipe) return <p>Receptet kunde inte hämtas.</p>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <h3>🥣 Ingredienser</h3>
            <ul>
                {recipe.ingredients.map((ing, i) => (
                    <li key={i}>
                        {ing.foodName} – {ing.amountInGrams} g
                        <button onClick={() => handleRemoveIngredient(ing.foodId)}>Ta bort</button>
                    </li>
                ))}
            </ul>

            <button onClick={handleLoadNutrition}>Visa näringsvärde</button>

            {nutrition.length > 0 && <NutritionTable nutrition={nutrition} />}

            <FoodSearchAndAdd />
        </div>
    );
};

export default RecipeDetails;