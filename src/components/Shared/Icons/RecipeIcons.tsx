import Delete from "./Recipes/delete.svg";
import Add from "./Recipes/add.svg";
import ChartColumn from "./Recipes/chart-column.svg";
import Done from "./Recipes/done.svg";

export const RecipeIcons = {
    Delete: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Delete} alt="Delete" width={size} height={size} className={className} />,
    Add: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Add} alt="Add" width={size} height={size} className={className} />,
    ChartColumn: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={ChartColumn} alt="Chart Column" width={size} height={size} className={className} />,
    Done: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Done} alt="Done" width={size} height={size} className={className} />,
};

export default RecipeIcons;