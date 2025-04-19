import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateRecipeName, publishRecipe } from "../../redux/Slices/recipeSlice";
import toast from "react-hot-toast";

interface RecipeSettingsProps {
    recipeId: number;
    onClose: () => void;
}

const RecipeSettings = ({ recipeId, onClose }: RecipeSettingsProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showRenameInput, setShowRenameInput] = useState(false);
    const [newName, setNewName] = useState("");

    const handleRenameClick = () => {
        setShowRenameInput(true);
    };

    const handleSubmitRename = () => {
        if (!newName.trim()) return;

        dispatch(updateRecipeName({ recipeId, name: newName }))
            .unwrap()
            .then(() => {
                setShowRenameInput(false);
                onClose();
                toast.success("Receptnamnet har ändrats!");
            });
    };

    const handlePublishClick = () => {
        dispatch(publishRecipe(recipeId))
            .unwrap()
            .then(() => {
                toast.success("Receptet har publicerats!");
            })
            .catch((error) => {
                toast.error("Misslyckades att publicera receptet: " + error.message);
            })
            .finally(() => {
                onClose();
            });
    };


    return (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
            {!showRenameInput ? (
                <>
                    <button
                        onClick={handleRenameClick}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        Ändra receptnamn
                    </button>
                    <button
                        onClick={handlePublishClick}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        Publicera recept
                    </button>
                </>
            ) : (
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border px-2 py-1 rounded-md text-sm"
                        placeholder="Nytt namn"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="text-sm px-2 py-1 rounded-md hover:bg-gray-100"
                        >
                            Avbryt
                        </button>
                        <button
                            onClick={handleSubmitRename}
                            className="text-sm px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Spara
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeSettings;
