import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { fetchNutritionForRecipe } from "../../redux/Slices/nutritionSlice";
import { Nutrition } from "../../redux/Slices/nutritionSlice";
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

const makro = [
    "Energi (kcal)", "Protein", "Kolhydrater, tillgängliga", "Fibrer", "Fett, totalt", "Vatten"
];

const vitaminer = [
    "Betakaroten/β-Karoten", "Folat, totalt", "Niacinekvivalenter", "Retinol", "Vitamin A", "Vitamin B1", "Tiamin",
    "Vitamin B2", "Riboflavin", "Vitamin B3", "Niacin", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K, "
];

const mineraler = [
    "Fosfor", "Fosfor, P", "Jod", "Jod, I", "Järn", "Järn, Fe", "Kalcium", "Kalcium, Ca", "Kalium", "Kalium, K",
    "Magnesium", "Magnesium, Mg", "Natrium", "Natrium, Na", "Selen", "Selen, Se", "Zink", "Zink, Zn"
];

const omega = [
    "DHA (C22:6)", "DPA (C22:5)", "EPA (C20:5)", "Linolensyra C18:3", "Linolsyra C18:2"
];


const groupNutrition = (nutrition: Nutrition[]) => {
    const grouped: Record<string, Nutrition[]> = {
        Makro: [],
        Vitaminer: [],
        Mineraler: [],
        Omega: [],
        Övrigt: []
    };

    for (const item of nutrition) {
        if (makro.includes(item.namn)) grouped.Makro.push(item);
        else if (vitaminer.includes(item.namn)) grouped.Vitaminer.push(item);
        else if (mineraler.includes(item.namn)) grouped.Mineraler.push(item);
        else if (omega.includes(item.namn)) grouped.Omega.push(item);
        else grouped.Övrigt.push(item);
    }

    return grouped;
};



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
                    {Object.entries(groupNutrition(nutrition)).map(([kategori, lista]) => (
                        <div key={kategori} style={{ marginTop: "1rem" }}>
                            <h4>{kategori}</h4>
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
                                    {lista.map((n, i) => (
                                        <tr key={i}>
                                            <td>{n.namn}</td>
                                            <td>{n.totaltVarde.toFixed(2)}</td>
                                            <td>{n.enhet}</td>
                                            <td>{n.procentAvRDI ? `${n.procentAvRDI.toFixed(0)}%` : "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </>
            )}

        </div>
    );
};

export default RecipeDetails;