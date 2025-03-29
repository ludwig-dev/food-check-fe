
import { useEffect, useState } from "react";
import { RecipeDetailsData } from "./RecipeDetails";
import { fetchRecipeById } from "../../service/recipeService";

export const useRecipe = (id: string) => {
    const [recipe, setRecipe] = useState<RecipeDetailsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const data = await fetchRecipeById(id);
                setRecipe(data);
            } catch (error) {
                console.error("Failed to fetch recipe");
            } finally {
                setLoading(false);
            }
        };

        getRecipe();
    }, [id]);

    return { recipe, loading, setRecipe };
};
