import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { fetchNutritionForRecipe } from "../../redux/Slices/nutritionSlice";
import axios from "axios";

interface Ingredient {
    foodId: number;
    foodName: string;
    amountInGrams: number;
}

interface RecipeDetailsData {
    id: number;
    name: string;
    ingredients: Ingredient[];
}

const RecipeDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [recipe, setRecipe] = useState<RecipeDetailsData | null>(null);
    const [loading, setLoading] = useState(true);

    const nutrition = useSelector((state: RootState) => state.nutrition.nutrition);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/recipes/${id}`, {
                    withCredentials: true,
                });
                setRecipe(response.data);
            } catch (error) {
                console.error("Kunde inte hämta recept");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

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
                    </li>
                ))}
            </ul>

            <button onClick={handleLoadNutrition}>Visa näringsvärde</button>

            {nutrition.length > 0 && (
                <>
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
                            {nutrition.map((n, i) => (
                                <tr key={i}>
                                    <td>{n.namn}</td>
                                    <td>{n.totaltVarde.toFixed(2)}</td>
                                    <td>{n.enhet}</td>
                                    <td>{n.procentAvRDI ? `${n.procentAvRDI.toFixed(0)}%` : "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default RecipeDetails;