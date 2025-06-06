import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removeIngredient, fetchRecipeById, updateIngredientAmount } from "../../redux/Slices/recipeSlice";
import { fetchNutritionForRecipe } from "../../redux/Slices/nutritionSlice";
import FoodSearchAndAdd from "../Food/FoodSearchAndAdd";
import { useEffect, useState } from "react";
import { RecipeDetailsData } from "../../redux/Slices/recipeSlice";
import NutritionPopup from "./NutritionPopup";
import RecipeIcons from "../Shared/Icons/RecipeIcons";
import UserIcons from "../Shared/Icons/UserIcons";
import RecipeSettings from "./RecipeSettings";
import toast from "react-hot-toast";

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = parseInt(id?.split('-')[0] || '', 10);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const recipe = useSelector((state: RootState) =>
        state.recipe.recipes.find((r) => r.id === numericId)
    );

    const isDetailed = recipe && 'ingredients' in recipe;
    const detailedRecipe = isDetailed ? (recipe as RecipeDetailsData) : null;

    const nutrition = useSelector((state: RootState) => state.nutrition.nutrition);

    const [updatedAmounts, setUpdatedAmounts] = useState<{ [key: number]: number }>({});
    const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        if (!numericId || (!recipe || !isDetailed)) {
            dispatch(fetchRecipeById(numericId));
        }
    }, [dispatch, numericId, recipe, isDetailed]);

    const handleUpdateIngredientAmount = (foodId: number) => {
        const newAmount = updatedAmounts[foodId];

        if (detailedRecipe && newAmount !== undefined) {
            dispatch(updateIngredientAmount({
                recipeId: numericId,
                foodId,
                newAmountInGrams: newAmount,
            }))
                .unwrap()
                .then(() => {
                    toast.success("Mängden uppdaterad för " + detailedRecipe.ingredients.find(ing => ing.foodId === foodId)?.foodName + "!");
                })
                .catch(() => {
                    toast.error("Misslyckades att uppdatera mängden för " + detailedRecipe.ingredients.find(ing => ing.foodId === foodId)?.foodName);
                });
        }
    };

    const handleRemoveIngredient = (foodId: number) => {
        if (detailedRecipe) {
            dispatch(removeIngredient({ recipeId: numericId, foodId }))
                .unwrap()
                .then(() => {
                    toast.success("Ingrediensen borttagen!");
                })
                .catch(() => {
                    toast.error("Misslyckades att ta bort ingrediensen.");
                });
        }
    };

    const handleShowNutrition = () => {
        if (numericId) {
            dispatch(fetchNutritionForRecipe(numericId));
            setIsNutritionModalOpen(true);
        }
    };

    if (!detailedRecipe)
        return (
            <p className="text-center text-gray-500 mt-8">
                Receptet kunde inte hämtas.
            </p>
        );

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-gray-600 border rounded-md px-3 py-1 hover:bg-gray-200 transition"
                >
                    <RecipeIcons.GoBack size={22} className="opacity-100" />
                </button>

                <h2 className="text-3xl font-semibold text-gray-900 text-center">
                    Recept: <span className="text-blue-600">{detailedRecipe.name}</span>
                </h2>

                {/* Invisible spacer to balance the layout */}
                {/* <div className="w-[90px]"></div> */}
                <div className="relative">
                    <button
                        onClick={() => setShowSettings((prev) => !prev)}
                        className="text-sm text-gray-600 border rounded-md px-3 py-1 hover:bg-gray-200 transition"
                    >
                        <RecipeIcons.Settings size={22} className="opacity-100" />
                    </button>

                    {showSettings && (
                        <RecipeSettings
                            recipeId={numericId}
                            onClose={() => setShowSettings(false)}
                        />
                    )}
                </div>

            </div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Ingredienser</h3>

                <div className="flex items-center gap-2 ml-auto">
                    <button
                        onClick={handleShowNutrition}
                        className="text-sm text-gray-600 border rounded-md px-2 py-1 hover:bg-gray-200 transition"
                    >
                        <RecipeIcons.ChartColumn size={22} className="opacity-100" />
                    </button>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-sm text-gray-600 border rounded-md px-2 py-1 hover:bg-gray-200 transition"
                    >
                        {isEditing ? <RecipeIcons.Done size={22} className="opacity-100" /> : <UserIcons.Edit size={22} className="opacity-100" />}
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {detailedRecipe.ingredients.map((ing) => (
                    <li
                        key={ing.foodId}
                        className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-base font-medium text-gray-800">
                                    {ing.foodName}
                                </p>
                                {isEditing ? (
                                    <div className="flex items-center gap-2 mt-1">
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
                                            className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                        />
                                        <button
                                            onClick={() => handleUpdateIngredientAmount(ing.foodId)}
                                            className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 transition"
                                        >
                                            <RecipeIcons.Update size={20} className="opacity-80" />
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600">Mängd: {ing.amountInGrams} g</p>
                                )}
                            </div>
                            <button
                                onClick={() => handleRemoveIngredient(ing.foodId)}
                                className="border border-gray-200 rounded-md px-2 py-1 text-gray-600 hover:bg-red-400 transition"
                            >
                                <RecipeIcons.Delete size={20} className="opacity-80" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <FoodSearchAndAdd />

            {isNutritionModalOpen && (
                <NutritionPopup
                    nutrition={nutrition}
                    onClose={() => setIsNutritionModalOpen(false)}
                />
            )}
        </div>
    );
};

export default RecipeDetails;