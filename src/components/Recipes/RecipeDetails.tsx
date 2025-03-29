import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removeIngredient, fetchRecipeById, updateIngredientAmount } from "../../redux/Slices/recipeSlice";
import { fetchNutritionForRecipe } from "../../redux/Slices/nutritionSlice";
import FoodSearchAndAdd from "../Food/FoodSearchAndAdd";
import NutritionTable from "./NutritionTable";
import { useEffect, useState } from "react";
import { RecipeDetailsData } from "../../redux/Slices/recipeSlice";




const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const recipe = useSelector((state: RootState) => state.recipe.recipes.find((r) => r.id === parseInt(id!)));
    const isDetailed = recipe && "ingredients" in recipe;
    const nutrition = useSelector((state: RootState) => state.nutrition.nutrition);

    useEffect(() => {
        // If we don't have a recipe or it's not detailed, fetch the full details
        if (!recipe || !isDetailed) {
            dispatch(fetchRecipeById(parseInt(id!)));
        }
    }, [dispatch, id, recipe, isDetailed]);


    const detailedRecipe = isDetailed ? (recipe as RecipeDetailsData) : null;

    const [updatedAmounts, setUpdatedAmounts] = useState<{ [key: number]: number }>({});

    const handleUpdateIngredientAmount = (foodId: number) => {
        const newAmount = updatedAmounts[foodId];
        if (detailedRecipe && newAmount !== undefined) {
            dispatch(
                updateIngredientAmount({
                    recipeId: detailedRecipe.id,
                    foodId,
                    newAmountInGrams: newAmount,
                })
            );
        }
    };

    const handleRemoveIngredient = (foodId: number) => {
        if (detailedRecipe) {
            dispatch(removeIngredient({ recipeId: detailedRecipe.id, foodId }));
        }
    };

    const handleLoadNutrition = () => {
        if (id) dispatch(fetchNutritionForRecipe(parseInt(id)));
    };

    if (!detailedRecipe) return <p>Receptet kunde inte hämtas.</p>;

    return (
        <div>
            <h2>{detailedRecipe.name}</h2>
            <h3>🥣 Ingredienser</h3>
            <ul>
                {detailedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>
                        {ing.foodName} – {ing.amountInGrams} g
                        <button onClick={() => handleRemoveIngredient(ing.foodId)}>Ta bort</button>
                        <br />
                        {/* Input to update the amount */}
                        <input
                            type="number"
                            value={
                                updatedAmounts[ing.foodId] !== undefined
                                    ? updatedAmounts[ing.foodId]
                                    : ing.amountInGrams
                            }
                            onChange={(e) =>
                                setUpdatedAmounts({
                                    ...updatedAmounts,
                                    [ing.foodId]: Number(e.target.value),
                                })
                            }
                        />
                        <button onClick={() => handleUpdateIngredientAmount(ing.foodId)}>
                            Uppdatera mängd
                        </button>
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