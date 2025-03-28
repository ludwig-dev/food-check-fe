import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRecipes } from "../../redux/Slices/recipeSlice";
import { Link } from "react-router-dom";


const RecipeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error } = useSelector((state: RootState) => state.recipe);
    const nutrition = useSelector((state: RootState) => state.nutrition.nutrition);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

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

            {nutrition.length > 0 && (
                <div>
                    <h3>🍎 Näringsvärde</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Namn</th>
                                <th>Värde</th>
                                <th>Enhet</th>
                                <th>% RDI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutrition.map((n, idx) => (
                                <tr key={idx}>
                                    <td>{n.namn}</td>
                                    <td>{n.totaltVarde.toFixed(2)}</td>
                                    <td>{n.enhet}</td>
                                    <td>{n.procentAvRDI ? `${n.procentAvRDI.toFixed(0)}%` : "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RecipeList;
