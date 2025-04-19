import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchNutritionForRecipe } from "../../redux/Slices/nutritionSlice";
import { fetchPublishedRecipeById } from "../../redux/Slices/publishedRecipesSlice";
import { useEffect } from "react";
// import NutritionPopup from "../Recipes/NutritionPopup";
import RecipeIcons from "../Shared/Icons/RecipeIcons";
import toast from "react-hot-toast";

const PublicRecipeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = parseInt(id?.split("-")[0] || "", 10);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const recipe = useSelector((state: RootState) => state.publishedRecipes.currentRecipe);

    // const nutrition = useSelector((state: RootState) => state.nutrition.nutrition);
    // const isNutritionModalOpen = useSelector((state: RootState) => state.nutrition.modalOpen);

    useEffect(() => {
        if (numericId) {
            dispatch(fetchPublishedRecipeById(numericId))
        }
    }, [dispatch, numericId]);

    const handleShowNutrition = () => {
        if (numericId) {
            dispatch(fetchNutritionForRecipe(numericId))
                .unwrap()
                .then(() => {
                    toast.success("Näringsinformation hämtad!");
                })
                .catch(() => {
                    toast.error("Misslyckades att ta hämta näringsinformation");
                });
        }
    };

    if (!recipe) {
        return <p className="text-center text-gray-500 mt-8">Receptet kunde inte hämtas.</p>;
    }

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
                    Recept: <span className="text-blue-600">{recipe.name}</span>
                </h2>

                <div className="w-[90px]"></div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Ingredienser</h3>
                <button
                    onClick={handleShowNutrition}
                    className="text-sm text-gray-600 border rounded-md px-2 py-1 hover:bg-gray-200 transition"
                >
                    <RecipeIcons.ChartColumn size={22} className="opacity-100" />
                </button>
            </div>

            <ul className="space-y-4">
                {recipe.ingredients.map((ing) => (
                    <li
                        key={ing.foodId}
                        className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                    >
                        <p className="text-base font-medium text-gray-800">{ing.foodName}</p>
                        <p className="text-sm text-gray-600">Mängd: {ing.amountInGrams} g</p>
                    </li>
                ))}
            </ul>

            {/* {isNutritionModalOpen && (
                <NutritionPopup
                    nutrition={nutrition}
                    onClose={() => dispatch({ type: "nutrition/closeModal" })}
                />
            )} */}
        </div>
    );
};

export default PublicRecipeDetails;
