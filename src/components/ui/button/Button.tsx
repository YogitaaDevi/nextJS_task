import React from "react";

interface ButtonProps {
  className?: string;
  name: string;
  onClick?: () => void;
  variant?: "PRIMARY" | "SECONDARY";
  size?: "sm" | "lg" | "md";
  disabled?: boolean;
}

const Button = ({
  className,
  name,
  onClick,
  variant = "PRIMARY",
  size = "md",
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
