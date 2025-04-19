import React from "react";

interface InputField {
    icon: React.FC<{ size?: number; className?: string }>;
    type: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    ariaLabel: string;
}

interface AuthFormProps {
    title: string;
    fields: InputField[];
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    loading?: boolean;
    footer?: React.ReactNode;
}

const AuthForm = ({
    title,
    fields,
    onSubmit,
    submitLabel,
    loading = false,
    footer,
}: AuthFormProps) => {
    return (
        <div className="px-4 py-16 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">{title}</h2>


                <form onSubmit={onSubmit} className="space-y-4">
                    {fields.map((field, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-300 transition"
                        >
                            <field.icon size={20} className="w-5 h-5 mr-3" />
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                required
                                className="w-full bg-transparent outline-none text-gray-800 text-sm"
                                aria-label={field.ariaLabel}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 rounded-md text-white font-medium transition-transform duration-200 ${loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                            }`}
                    >
                        {loading ? `${submitLabel}...` : submitLabel}
                    </button>
                </form>

                {footer && <div className="mt-4">{footer}</div>}
            </div>
        </div>
    );
};

export default AuthForm;
