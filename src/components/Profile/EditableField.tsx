import RecipeIcons from "../Shared/Icons/RecipeIcons";

interface EditableFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    onSave: () => void;
    isEditing: boolean;
    Icon: React.FC<{ size?: number; className?: string }>;
}

const EditableField = ({ value, onChange, onSave, isEditing, Icon }: EditableFieldProps) => (
    <div className="flex items-center gap-3 mb-4">
        <Icon size={20} className="w-5 h-5 mr-3" />
        {isEditing ? (
            <>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-800 w-52"
                />
                <button
                    onClick={onSave}
                    className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                    <RecipeIcons.Update size={20} className="opacity-80" />
                </button>
            </>
        ) : (
            <p className="text-sm text-gray-800">{value}</p>
        )}
    </div>
);

export default EditableField;
