import React from "react";

interface TextFieldProps {
  type: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  checked?: boolean;
  onKeyDown?: (e: any) => void;
}

const TextField = ({
  className = "",
  onChange,
  type = "text",
  placeholder = "",
  onClick,
  onKeyDown,
  checked
}: TextFieldProps) => {
  return (
    <input
      type={type}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      onClick={onClick}
      onKeyDown={onKeyDown}
      checked={checked}
    />
  );
};

export default TextField;
