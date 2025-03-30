import Delete from "./Recipes/delete.svg";
import Add from "./Recipes/add.svg";

export const RecipeIcons = {
    Delete: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Delete} alt="Email" width={size} height={size} className={className} />,
    Add: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Add} alt="Email" width={size} height={size} className={className} />,
};

export default RecipeIcons;