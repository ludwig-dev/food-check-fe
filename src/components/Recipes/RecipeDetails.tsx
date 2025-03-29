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

    if (!detailedRecipe)
        return (
            <p className="text-center text-gray-500 mt-8">
                Receptet kunde inte hämtas.
            </p>
        );

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-semibold text-center text-gray-900 mb-10">
                {detailedRecipe.name}
            </h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">🥣 Ingredienser</h3>
            <ul className="space-y-4">
                {detailedRecipe.ingredients.map((ing) => (
                    <li
                        key={ing.foodId}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                        <div>
                            <p className="text-lg font-medium text-gray-900">{ing.foodName}</p>
                            <p className="text-sm text-gray-600">Mängd: {ing.amountInGrams} g</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
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
                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                onClick={() => handleUpdateIngredientAmount(ing.foodId)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Uppdatera
                            </button>
                            <button
                                onClick={() => handleRemoveIngredient(ing.foodId)}
                                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                            >
                                Ta bort
                            </button>
                        </div>
                    </li>
                ))}
            </ul>


            <div className="mt-10">
                <FoodSearchAndAdd />
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={handleLoadNutrition}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    Visa näringsvärde
                </button>
            </div>

            {nutrition.length > 0 && (
                <div className="mt-10">
                    <NutritionTable nutrition={nutrition} />
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;