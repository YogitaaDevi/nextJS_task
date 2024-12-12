import React from "react";

interface TextFieldProps {
  type: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  checked?: boolean
}

const TextField = ({
  className = "",
  onChange,
  type = "text",
  placeholder = "",
  onClick,
}: TextFieldProps) => {
  return (
    <input
      type={type}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      onClick={onClick}
    />
  );
};

export default TextField;
