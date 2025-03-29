import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRecipes, createRecipe, deleteRecipe } from "../../redux/Slices/recipeSlice";
import { Link } from "react-router-dom";

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

    return (
        <div>
            <div className="flex items-center mb-6">
                <h2>📋 Mina recept</h2>
                <button onClick={handleCreateRecipe}>Skapa nytt recept</button>
            </div>

            {loading && <p>Laddar recept...</p>}

            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                        <button onClick={() => handleDeleteRecipe(recipe.id)}>Ta bort</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
