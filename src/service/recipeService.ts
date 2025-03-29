import axios from "axios";
import { RecipeDetailsData } from "../redux/Slices/recipeSlice";

export const fetchRecipeById = async (id: string | number): Promise<RecipeDetailsData> => {
    const response = await axios.get(`http://localhost:8080/api/recipes/${id}`, { withCredentials: true });
    return response.data;
};
