import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchPublishedRecipes, clearPublishedRecipes } from "../../redux/Slices/publishedRecipesSlice";
import { Link } from "react-router-dom";

const PublishedRecipesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error } = useSelector((state: RootState) => state.publishedRecipes);

    useEffect(() => {
        dispatch(fetchPublishedRecipes());

        return () => {
            dispatch(clearPublishedRecipes());
        };
    }, [dispatch]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">Upptäck recept</h1>

            {loading && <p className="text-gray-500">Laddar recept...</p>}
            {error && <p className="text-red-500">Fel: {error}</p>}

            <ul className="space-y-4">
                {recipes.map((recipe) => (
                    <li
                        key={recipe.id}
                        className="bg-white rounded-lg shadow p-4 border border-gray-100 flex justify-between items-center"
                    >
                        <Link
                            to={`/public-recipes/${recipe.id}-${slugify(recipe.name)}`}
                            className="text-lg font-medium text-blue-600 hover:underline"
                        >
                            {recipe.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

export default PublishedRecipesPage;
