type CustomInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  altCss?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  minValue = 0,
  maxValue = Math.pow(10, 26),
  altCss = '',
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minValue}
        max={maxValue}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none text-black w-full
          ${disabled ? 'bg-gray-200' : 'bg-white'}
          ${disabled ? '' : 'shadow-md shadow-gray-700'}
        `}
      />
    </div>
  );
};

export default CustomInput;