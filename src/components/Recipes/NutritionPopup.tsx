// NutritionPopup.tsx
import React from "react";
import Modal from "../Shared/Modal";
import NutritionTable from "./NutritionTable";
import { Nutrition } from "../../redux/Slices/nutritionSlice"; // adjust import if needed

interface NutritionPopupProps {
    nutrition: Nutrition[];
    onClose: () => void;
}

const NutritionPopup: React.FC<NutritionPopupProps> = ({ nutrition, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <h3 className="text-2xl font-bold mb-4">Näringsvärde</h3>
            <NutritionTable nutrition={nutrition} />
        </Modal>
    );
};

export default NutritionPopup;