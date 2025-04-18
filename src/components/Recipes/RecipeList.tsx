import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRecipes, createRecipe, deleteRecipe } from "../../redux/Slices/recipeSlice";
import { Link } from "react-router-dom";
import RecipeIcons from "../Shared/Icons/RecipeIcons";

const RecipeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading } = useSelector((state: RootState) => state.recipe);

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(fetchRecipes());
        }
    }, [dispatch, recipes.length]);

    const handleDeleteRecipe = (id: number) => {
        if (window.confirm("Är du säker på att du vill ta bort detta recept?")) {
            dispatch(deleteRecipe(id));
        }
    };

    const handleCreateRecipe = () => {
        const name = prompt("Ange receptnamn:");
        if (name) {
            dispatch(createRecipe({ name, ingredients: [] }));
        }
    };

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        // spaces to dashes
            .replace(/[^\w\-]+/g, '')    // remove special chars
            .replace(/\-\-+/g, '-');     // collapse multiple dashes


    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900"> Mina recept</h2>
                <button
                    onClick={handleCreateRecipe}
                    className="border rounded-md px-2 py-1 text-gray-600 hover:bg-gray-200 transition"
                >
                    <RecipeIcons.Add size={22} className="opacity-80" />

                </button>
            </div>

            {loading && <p className="text-center text-gray-500">Laddar recept...</p>}

            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li
                        key={recipe.id}
                        className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex justify-between items-center"
                    >
                        <Link
                            to={`/recipes/${recipe.id}-${slugify(recipe.name)}`}
                            className="text-base font-medium text-gray-800 hover:underline"
                        >
                            {recipe.name}
                        </Link>
                        <button
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="border border-gray-400 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-red-400 transition"
                        >
                            <RecipeIcons.Delete size={20} className="opacity-80" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
