import { Nutrition } from "../../redux/Slices/nutritionSlice";

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

export const groupNutrition = (nutrition: Nutrition[]) => {
    const grouped: Record<string, Nutrition[]> = {
        Makro: [],
        Vitaminer: [],
        Mineraler: [],
        Omega: [],
        Övrigt: []
    };

    nutrition.forEach((item) => {
        if (makro.includes(item.namn)) grouped.Makro.push(item);
        else if (vitaminer.includes(item.namn)) grouped.Vitaminer.push(item);
        else if (mineraler.includes(item.namn)) grouped.Mineraler.push(item);
        else if (omega.includes(item.namn)) grouped.Omega.push(item);
        else grouped.Övrigt.push(item);
    });

    return grouped;
};
