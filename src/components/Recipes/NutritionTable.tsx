import React from "react";
import { Nutrition } from "../../redux/Slices/nutritionSlice";
import { groupNutrition } from "./nutritionUtils";

interface NutritionTableProps {
    nutrition: Nutrition[];
  }
  
  const NutritionTable: React.FC<NutritionTableProps> = ({ nutrition }) => {
    const grouped = groupNutrition(nutrition);
  
    return (
      <>
        <h3>🍎 Näringsvärde</h3>
        {Object.entries(grouped).map(([kategori, lista]) => (
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
    );
  };
  
  export default NutritionTable;