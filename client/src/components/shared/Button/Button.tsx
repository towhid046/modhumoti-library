import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  customClass?: string;
  clickHandler?: () => void;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  customClass,
  clickHandler,
  isDisabled
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={clickHandler}
      className={`${customClass} ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-color text-base-200 hover:bg-secondary-color transition duration-300'} md:py-2 py-1.5 md:px-5 px-4 rounded`}
    >
      {children}
    </button>
  );
};

export default Button;