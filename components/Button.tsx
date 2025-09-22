import React from "react";

interface ButtonProps {
  children: React.ReactNode; // to hold svg things
  onClick: () => void;
  variant: "default" | "add" | "save" | "delete";
}

const Button = ({ children, onClick, variant = "default" }: ButtonProps) => {
  const baseStyle = "";
  return (
    <div className="flex min-h-[56px] min-w-[168px] justify-center gap-6 rounded-2xl text-lg shadow-md">
      Button
    </div>
  );
};

export default Button;
