// components/Button.tsx
import React from 'react';

type ButtonProps = {
  color: string;
  onClick: () => void;
  children: React.ReactNode;
  textSize: string,
  altCss: string,
};

const Button: React.FC<ButtonProps> = ({ color, onClick, children, textSize, altCss }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white rounded ${color} shadow-md shadow-gray-600 hover:shadow-lg focus:outline-none transition-all duration-300 ${textSize} ${altCss}`}
    >
      {children}
    </button>
  );
};

export default Button;