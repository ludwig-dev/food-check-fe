import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRecipes } from "../../redux/Slices/recipeSlice";
import { Link } from "react-router-dom";

const RecipeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error } = useSelector((state: RootState) => state.recipe);

    useEffect(() => {
        if (recipes.length === 0) {
            dispatch(fetchRecipes());
        }
    }, [dispatch, recipes.length]);

    return (
        <div>
            <h2>📋 Mina recept</h2>

            {loading && <p>Laddar recept...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
