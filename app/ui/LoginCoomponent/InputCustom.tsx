interface InputFieldProps {
    id: string;
    type?: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export const InputCustom: React.FC<InputFieldProps> = ({ id, type = "text", name, placeholder, value, onChange, required = false }) => (
    <div className="relative w-full">
        <label htmlFor={id} className="text-lg mb-2 block">
            {placeholder} {required && "*"}
        </label>
        <input
            className="w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

interface TextAreaFieldProps {
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ id, name, placeholder, value, onChange, required = false }) => (
    <div className="relative w-full">
        <label htmlFor={id} className="text-lg mb-2 block">
            {placeholder} {required && "*"}
        </label>
        <textarea
            className="w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);
