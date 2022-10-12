import React, { InputHTMLAttributes } from "react";

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: React.FC<InputProp> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label} </label>
      <input {...props} />
    </div>
  );
};

export default InputField;
