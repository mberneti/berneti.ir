import React from "react";

interface TextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  inputProps,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="font-v1-en px-4 py-2 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 my-4 w-full"
      {...inputProps}
    />
  );
};
