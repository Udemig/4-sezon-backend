const Input = ({
  label,
  name,
  placeholder,
  disabled = false,
  type = "text",
  isReq = false,
}) => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-dark disabled:bg-gray-200 focus:border-blue-500"
        type={type}
        placeholder={placeholder}
        name={name}
        required={isReq}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
