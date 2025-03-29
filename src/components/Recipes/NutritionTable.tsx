import React from "react";
import { Nutrition } from "../../redux/Slices/nutritionSlice";
import { groupNutrition } from "./nutritionUtils";

interface NutritionTableProps {
    nutrition: Nutrition[];
}

const formatVitaminName = (name: string) => {
    // Split the vitamin name into two parts if they are too long
    if (name.length <= 15) return name;
    const mid = Math.floor(name.length / 2);
    return name.slice(0, mid) + " - " + name.slice(mid);
};

const NutritionTable: React.FC<NutritionTableProps> = ({ nutrition }) => {
    const grouped = groupNutrition(nutrition);

    return (
        <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(grouped).map(([kategori, lista]) => (
                    <div
                        key={kategori}
                        className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                    >
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">
                            {kategori}
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-sm text-gray-700">
                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                    <tr>
                                        <th className={`py-2 px-3 font-medium text-left ${kategori === "Vitaminer" ? "w-1/2" : ""}`}>
                                            Namn
                                        </th>
                                        <th className="py-2 px-3 font-medium text-left">Värde</th>
                                        <th className="py-2 px-3 font-medium text-left">Enhet</th>
                                        <th className="py-2 px-3 font-medium text-left">% RDI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lista.map((n, i) => (
                                        <tr
                                            key={i}
                                            className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className={`py-2 px-3 ${kategori === "Vitaminer" ? "w-1/2" : ""}`}>
                                                {kategori === "Vitaminer"
                                                    ? formatVitaminName(n.namn)
                                                    : n.namn}
                                            </td>
                                            <td className="py-2 px-3">{n.totaltVarde.toFixed(2)}</td>
                                            <td className="py-2 px-3">{n.enhet}</td>
                                            <td className="py-2 px-3">
                                                {n.procentAvRDI ? `${n.procentAvRDI.toFixed(0)}%` : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NutritionTable;
